import {
  getAllPostsExpandUser,
  getAllQuizzesExpandUser,
  getCurrentUserProfile,
  postNewPostFromHomeView,
} from "../../Services/homeService";
import "./HomeView.css";
import { useEffect, useState } from "react";
import { HomeViewQuizzes } from "./HomeViewQuizzes/HomeViewQuizzes";
import setBodyColor from "../../Services/setBodyColor";

export const HomeView = ({ currentUser }) => {
  const [allQuizzesAndPosts, setAllQuizzesAndPosts] = useState([]);
  const [currentUserProfile, setCurrentUserProfile] = useState({});
  const [postText, setPostText] = useState("");
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    if (currentUser?.id) {
      getCurrentUserProfile(currentUser).then((currentUserObj) => {
        setCurrentUserProfile(currentUserObj);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    getAllQuizzesExpandUser().then((questionObj) => {
      setAllQuizzes(questionObj);
    });
  }, []);

  useEffect(() => {
    getAllPostsExpandUser().then((postObj) => {
      setAllPosts(postObj);
    });
  }, []);

  useEffect(() => {
    const Total = allQuizzes.length + allPosts.length;
    const randomPostAndQuizGen = [];
    const allPostsAndQuizzes = [];
    if (allPosts.length != 0) {
      allPosts.map((postObj) => {
        if (postObj?.likes.length != 0) {
          postObj.likes.map((likedObj) => {
            if (likedObj.userId === currentUser.id) {
              postObj.isLiked = true;
            } else {
              postObj.isLiked = false;
            }
          });
        } else {
          postObj.isLiked = false;
        }
        allPostsAndQuizzes.push(postObj);
      });
    }
    if (allQuizzes.length != 0) {
      allQuizzes.map((quizObj) => {
        if (quizObj?.likes.length != 0) {
          quizObj.likes.map((likedObj) => {
            if (likedObj.userId === currentUser.id) {
              quizObj.isLiked = true;
            } else {
              quizObj.isLiked = false;
            }
          });
        } else {
          quizObj.isLiked = false;
        }
        allPostsAndQuizzes.push(quizObj);
      });
    }

    while (randomPostAndQuizGen.length !== Total) {
      const randObj = allPostsAndQuizzes[Math.floor(Math.random() * Total)];
      if (!randomPostAndQuizGen.includes(randObj)) {
        randomPostAndQuizGen.push(randObj);
      }
    }

    if (allPostsAndQuizzes.length != 0) {
      setAllQuizzesAndPosts(randomPostAndQuizGen);
    }

    // while (randomPostAndQuizGen.length !== Total) {
    //   const randObj = allPostsAndQuizzes[]
    // }
  }, [allPosts, allQuizzes]);

  // useEffect(() => {
  //   console.log(allQuizzesAndPosts);
  // }, [allQuizzesAndPosts]);

  const handlePostSave = (evt) => {
    evt.preventDefault();

    const post = {
      userId: currentUser.id,
      body: postText,
      postDate: new Date().toLocaleDateString(),
    };

    postNewPostFromHomeView(post);
    setPostText("");
  };

  return (
    <>
      <div className="HomeView-home-container">
        <div>
          {/* <header className="HomeView-ForYou-Following">
            For you Following
          </header> */}
        </div>
        {currentUser?.id && (
          <div className="HomeView-createpost-container">
            <form
              onSubmit={(evt) => {
                handlePostSave(evt);
              }}
            >
              <div className="HomeView-textarea-container">
                <img
                  className="HomeView-createpost-profilepicture"
                  src={currentUserProfile.profilepicture}
                />
                <textarea
                  required
                  maxLength={138}
                  className="HomeView-createpost-textarea"
                  placeholder="Wanna share with the class?..."
                  value={postText}
                  onChange={(evt) => {
                    setPostText(evt.target.value);
                  }}
                />
              </div>
              <button className="HomeView-createpost-btn" type="submit">
                Post
              </button>
            </form>
          </div>
        )}
        <div className="HomeView-allPosts-container">
          {allQuizzesAndPosts.map((object) => {
            if (object.hasOwnProperty("title")) {
              return (
                <HomeViewQuizzes
                  key={object.id + object.title}
                  object={object}
                  allQuizzesAndPosts={allQuizzesAndPosts}
                  setAllQuizzesAndPosts={setAllQuizzesAndPosts}
                  currentUser={currentUser}
                />
              );
            } else {
              return (
                <HomeViewQuizzes
                  key={object.id + object.body}
                  object={object}
                  allQuizzesAndPosts={allQuizzesAndPosts}
                  setAllQuizzesAndPosts={setAllQuizzesAndPosts}
                  currentUser={currentUser}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

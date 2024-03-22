import {
  getAllQuizzesExpandUser,
  getCurrentUserProfile,
  postNewPostFromHomeView,
} from "../../Services/homeService";
import "./HomeView.css";
import { useEffect, useState } from "react";
import { HomeViewQuizzes } from "./HomeViewQuizzes/HomeViewQuizzes";

export const HomeView = ({ currentUser }) => {
  const [currentUserProfile, setCurrentUserProfile] = useState({});
  const [postText, setPostText] = useState("");
  const [allQuizzes, setAllQuizzes] = useState([]);

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

  const handlePostSave = (evt) => {
    evt.preventDefault();

    const post = {
      userId: currentUser.id,
      body: postText,
      postDate: Math.floor(
        new Date(new Date().toLocaleDateString()).getTime() / 1000
      ),
    };

    console.log(post);
    // postNewPostFromHomeView(post);
  };

  return (
    <>
      <div className="HomeView-home-container">
        <div>
          <header className="HomeView-ForYou-Following">
            For you Following
          </header>
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
          {allQuizzes.map((quizObj) => {
            return <HomeViewQuizzes key={quizObj.id} quizObj={quizObj} />;
          })}
        </div>
      </div>
    </>
  );
};

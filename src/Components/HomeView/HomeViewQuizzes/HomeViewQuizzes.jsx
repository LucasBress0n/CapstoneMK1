import { Link } from "react-router-dom";
import { deleteLike, userLikePostOrQuiz } from "../../../Services/userService";

export const HomeViewQuizzes = ({
  object,
  allQuizzesAndPosts,
  setAllQuizzesAndPosts,
  currentUser,
}) => {
  if (object.hasOwnProperty("title")) {
    return (
      <div className="HomeView-quiz-main-container">
        <header className="HomeView-header">
          <div>
            <section className="HomeView-user-profile">
              <div className="HomeView-profilepicture-container">
                <img
                  className="HomeView-quiz-profilepicture"
                  src={object.user.profilepicture}
                />
              </div>
              <div className="Homeview-quiz-profilenames">
                <p className="Homeview-profile-displayname">
                  {object.user.displayname}
                </p>
                <p className="Homeview-profile-name">@{object.user.name}</p>
              </div>
            </section>
          </div>

          <p className="HomeView-quiz-title">{object.title}</p>
        </header>
        <div className="HomeView-banner-container">
          <Link to={`/quiz/${object.id}`}>
            <img className="HomeView-quiz-banner" src={object.banner} />
          </Link>
        </div>
        <footer className="HomeView-quiz-footer-container">
          {object.isLiked === true ? (
            <div
              className="HomeView-quiz-footer-like"
              onClick={() => {
                const copy = [...allQuizzesAndPosts];
                copy.map((quizObj) => {
                  if (quizObj.hasOwnProperty("title")) {
                    if (quizObj.id === object.id) {
                      quizObj.isLiked = false;
                      quizObj.likes.map((likedObj) => {
                        if (likedObj.userId === currentUser.id) {
                          deleteLike(likedObj);
                          quizObj.likes = quizObj.likes.filter(
                            (likes) => likes.id != likes.id
                          );
                        }
                      });
                    }
                  }
                });
                setAllQuizzesAndPosts(copy);
                // userLikePostOrQuiz(object, currentUser);
              }}
            >
              {object.likes.length} ❤️
            </div>
          ) : (
            <div
              className="HomeView-quiz-footer-like"
              onClick={() => {
                const copy = [...allQuizzesAndPosts];
                copy.map((quizObj) => {
                  if (quizObj.hasOwnProperty("title")) {
                    if (quizObj.id === object.id) {
                      quizObj.isLiked = true;
                      userLikePostOrQuiz(object, currentUser).then(
                        (createdObj) => {
                          quizObj.likes.push(createdObj);
                        }
                      );
                    }
                  }
                });
                setAllQuizzesAndPosts(copy);
                // userLikePostOrQuiz(object, currentUser);
              }}
            >
              {object.likes.length} ♡
            </div>
          )}
        </footer>
      </div>
    );
  } else {
    return (
      <div className="HomeView-post-main-container">
        <header className="HomeView-post-header">
          <img
            className="HomeView-post-image"
            src={object.user.profilepicture}
          />
          <div className="HomeView-post-infoContainer">
            <div className="HomeView-post-infoNames">
              <article className="HomeView-post-displayname">
                {object.user.displayname}
              </article>
              <article className="HomeView-post-name">
                @{object.user.name}
              </article>
            </div>
            <div className="HomeView-post-body">{object.body}</div>
          </div>
        </header>
        <footer className="HomeView-footer-postslikes">
          <div>{object.postDate}</div>
          {object.isLiked === true ? (
            <div
              className="HomeView-post-footer-like"
              onClick={() => {
                const copy = [...allQuizzesAndPosts];
                copy.map((postObj) => {
                  if (postObj.hasOwnProperty("body")) {
                    if (postObj.id === object.id) {
                      postObj.isLiked = false;
                      postObj.likes.map((likedObj) => {
                        if (likedObj.userId === currentUser.id) {
                          deleteLike(likedObj);
                          postObj.likes = postObj.likes.filter(
                            (likes) => likes.id != likes.id
                          );
                        }
                      });
                    }
                  }
                });
                setAllQuizzesAndPosts(copy);
                // userLikePostOrQuiz(object, currentUser);
              }}
            >
              {object.likes.length} ❤️
            </div>
          ) : (
            <div
              className="HomeView-post-footer-like"
              onClick={() => {
                const copy = [...allQuizzesAndPosts];
                copy.map((postObj) => {
                  if (postObj.hasOwnProperty("body")) {
                    if (postObj.id === object.id) {
                      postObj.isLiked = true;
                      userLikePostOrQuiz(object, currentUser).then(
                        (createdObj) => {
                          postObj.likes.push(createdObj);
                        }
                      );
                    }
                  }
                });
                setAllQuizzesAndPosts(copy);
                // userLikePostOrQuiz(object, currentUser);
              }}
            >
              {object.likes.length} ♡
            </div>
          )}
        </footer>
      </div>
    );
  }
};

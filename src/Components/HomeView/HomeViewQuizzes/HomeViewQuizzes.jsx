import { Link } from "react-router-dom";

export const HomeViewQuizzes = ({ quizObj }) => {
  return (
    <div className="HomeView-post-main-container">
      <header className="HomeView-header">
        <div>
          <section className="HomeView-user-profile">
            <div className="HomeView-profilepicture-container">
              <img
                className="HomeView-quiz-profilepicture"
                src={quizObj.user.profilepicture}
              />
            </div>
            <div className="Homeview-quiz-profilenames">
              <h5 className="Homeview-profile-displayname">
                {quizObj.user.displayname}
              </h5>
              <h6 className="Homeview-profile-name">{quizObj.user.name}</h6>
            </div>
          </section>
        </div>

        <p className="HomeView-quiz-title">{quizObj.title}</p>
      </header>
      <div className="HomeView-banner-container">
        <Link to={`/quiz/${quizObj.id}`}>
          <img className="HomeView-quiz-banner" src={quizObj.banner} />
        </Link>
      </div>
    </div>
  );
};
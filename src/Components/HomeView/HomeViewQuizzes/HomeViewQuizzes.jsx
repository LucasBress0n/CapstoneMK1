import { Link } from "react-router-dom";

export const HomeViewQuizzes = ({ object }) => {
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

        <footer>{object.postDate}</footer>
      </div>
    );
  }
};

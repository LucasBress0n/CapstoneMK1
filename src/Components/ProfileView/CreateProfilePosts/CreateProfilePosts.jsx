import { Link } from "react-router-dom";
import { deleteQuiz } from "../../../Services/userService";

export const CreateProfilePosts = ({ quizObj }) => {
  return (
    <>
      <div className="ProfileView-profile-post">
        <div className="ProfileView-profile-post-title">{quizObj.title}</div>
        <div className="ProfileView-profile-post-links">
          <Link to={`/edit/${quizObj.id}`}>edit</Link>
          <button
            onClick={() => {
              deleteQuiz(quizObj);
            }}
          >
            DEL
          </button>
        </div>
      </div>
    </>
  );
};

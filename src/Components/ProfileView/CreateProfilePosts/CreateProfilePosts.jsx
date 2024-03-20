import { Link } from "react-router-dom";
import { deleteQuiz } from "../../../Services/userService";

export const CreateProfilePosts = ({ quizObj }) => {
  return (
    <div>
      {quizObj.title} <Link to={`/edit/${quizObj.id}`}>edit</Link>{" "}
      <button
        onClick={() => {
          deleteQuiz(quizObj);
        }}
      >
        DEL
      </button>
    </div>
  );
};

import { Link } from "react-router-dom";
import { deleteQuiz } from "../../../Services/userService";
import { useEffect, useState } from "react";
import { getAllQuestionsByQuizId } from "../../../Services/profileService";
import { deleteAnswer, deleteQuestion } from "../../../Services/editService";

export const CreateProfilePosts = ({ quizObj, refresh, setRefresh }) => {
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    getAllQuestionsByQuizId(quizObj).then((arr) => {
      setAllQuestions(arr);
    });
  }, [quizObj]);

  return (
    <>
      <div className="ProfileView-profile-post">
        <div className="ProfileView-profile-post-title">{quizObj.title}</div>
        <div className="ProfileView-profile-post-links">
          <Link to={`/edit/${quizObj.id}`}>edit</Link>
          <button
            onClick={() => {
              allQuestions.map((questionObj) => {
                deleteQuestion(questionObj);
                questionObj.questionAnswers.map((questAnsObj) => {
                  deleteAnswer(questAnsObj);
                });
              });
              deleteQuiz(quizObj);
              setRefresh(!refresh);
            }}
          >
            DEL
          </button>
        </div>
      </div>
    </>
  );
};

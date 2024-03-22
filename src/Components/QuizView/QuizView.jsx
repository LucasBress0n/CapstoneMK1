import { useNavigate, useParams } from "react-router-dom";
import "./QuizView.css";
import { useEffect, useState } from "react";
import { getQuestionByQuizId, getQuizByQuizId } from "../../Services/testView";

import { getAnswers } from "../../Services/getAnswers";
import { QuizQuestionsCreate } from "./QuizQuestionsCreate/QuizQuestionsCreate";
import { QuizViewResults } from "./QuizQuestionsCreate/QuizViewResults";

export const QuizView = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quiz, setQuiz] = useState({});
  const [quizQuestion, setQuizQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getQuizByQuizId(parseInt(quizId)).then((quizObj) => {
      setQuiz(quizObj);
    });
  }, [quizId]);
  // This contains the Quizzes Title, and User

  useEffect(() => {
    getQuestionByQuizId(quiz).then((questionObj) => {
      setQuizQuestion(questionObj);
    });
  }, [quiz]);
  // This contains all Questions, and Question answers.

  useEffect(() => {
    getAnswers().then((answerArr) => {
      setAnswers(answerArr);
    });
  }, [quizQuestion]);
  // This contains all Answers

  useEffect(() => {
    console.log(selectedAnswers);
  }, [selectedAnswers]);

  let TotalQuestions = [];
  quizQuestion.map((quizObj) => {
    if (
      quizObj.questionAnswers.filter((filt) => filt.isCorrect === true)
        .length != 0
    ) {
      quizObj.questionAnswers.map((questObj) => {
        if (questObj.isCorrect === true) {
          TotalQuestions.push(questObj);
        }
      });
    }
  });

  return (
    <main className="QuizView-container">
      {quizCompleted ? (
        <div className="QuizView-results-main-container">
          <header className="QuizView-profile-main-container">
            <div className="QuizView-profile-container">
              <img
                className="QuizView-user-profile"
                src={quiz?.user?.profilepicture}
              />
              <p>{quiz?.user?.name}</p>
            </div>
            <h3>{quiz?.title}</h3>
            <p>
              {selectedAnswers
                ? selectedAnswers.filter((filt) => filt.isCorrect === true)
                    .length
                : "0"}
              /{TotalQuestions ? TotalQuestions.length : "0"}
            </p>
          </header>
          <div className="QuizView-questions-container">
            {quizQuestion.map((quizObj) => {
              return (
                <QuizViewResults
                  key={quizObj.id}
                  setSelectedAnswers={setSelectedAnswers}
                  selectedAnswers={selectedAnswers}
                  quizObj={quizObj}
                  answers={answers}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <header>
            <img src={quiz.banner} />
          </header>
          <header className="QuizView-profile-main-container">
            <div className="QuizView-profile-container">
              <img
                className="QuizView-user-profile"
                src={quiz?.user?.profilepicture}
              />
              <p>{quiz?.user?.name}</p>
            </div>
            <h3>{quiz?.title}</h3>
          </header>
          <div className="QuizView-questions-container">
            {quizQuestion.map((quizObj) => {
              return (
                <QuizQuestionsCreate
                  key={quizObj.id}
                  setSelectedAnswers={setSelectedAnswers}
                  selectedAnswers={selectedAnswers}
                  quizObj={quizObj}
                  answers={answers}
                />
              );
            })}
          </div>
          <button
            onClick={() => {
              setQuizCompleted(true);
              window.scrollTo(0, 0);
            }}
          >
            Submit
          </button>
        </div>
      )}
    </main>
  );
};

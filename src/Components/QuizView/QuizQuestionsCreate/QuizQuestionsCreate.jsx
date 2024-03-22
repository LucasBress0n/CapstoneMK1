import { useEffect } from "react";

export const QuizQuestionsCreate = ({
  quizObj,
  answers,
  setSelectedAnswers,
  selectedAnswers,
}) => {
  return (
    <div className="QuizView-questions-list">
      <header className="QuizView-question-questionText">
        {quizObj.questionText}
      </header>
      {quizObj.questionAnswers.map((QuestionAnswerObj) => {
        return (
          <p
            key={QuestionAnswerObj.id}
            className="QuizView-questionAnswer-p"
            type="submit"
          >
            <input
              className="QuizView-checkbox"
              type="checkbox"
              onClick={() => {
                if (
                  selectedAnswers.filter(
                    (answersObj) => answersObj.id === QuestionAnswerObj.id
                  ).length === 0
                ) {
                  const copy = [...selectedAnswers];
                  copy.push(QuestionAnswerObj);
                  setSelectedAnswers(copy);
                } else {
                  setSelectedAnswers(
                    selectedAnswers.filter(
                      (answerObj) => answerObj.id != QuestionAnswerObj.id
                    )
                  );
                }
              }}
            />
            {answers.map((answerObj) => {
              if (answerObj.id === QuestionAnswerObj.answerId) {
                return answerObj.name;
              }
            })}
          </p>
        );
      })}
    </div>
  );
};

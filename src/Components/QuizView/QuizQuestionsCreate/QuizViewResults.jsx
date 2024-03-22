export const QuizViewResults = ({ quizObj, answers, selectedAnswers }) => {
  return (
    <div className="QuizView-questions-list">
      <header className="QuizView-question-questionText">
        {quizObj.questionText}
      </header>
      {quizObj.questionAnswers.map((QuestionAnswerObj) => {
        if (QuestionAnswerObj.isCorrect) {
          if (selectedAnswers.includes(QuestionAnswerObj)) {
            return (
              <p
                key={QuestionAnswerObj.id}
                className="QuizView-question-correct"
              >
                {answers.map((answerObj) => {
                  if (answerObj.id === QuestionAnswerObj.answerId) {
                    return answerObj.name;
                  }
                })}
              </p>
            );
          } else {
            return (
              <p key={QuestionAnswerObj.id} className="QuizView-question-grey">
                {answers.map((answerObj) => {
                  if (answerObj.id === QuestionAnswerObj.answerId) {
                    return answerObj.name;
                  }
                })}
              </p>
            );
          }
        } else if (selectedAnswers.includes(QuestionAnswerObj)) {
          return (
            <p
              key={QuestionAnswerObj.id}
              className="QuizView-question-incorrect"
            >
              {answers.map((answerObj) => {
                if (answerObj.id === QuestionAnswerObj.answerId) {
                  return answerObj.name;
                }
              })}
            </p>
          );
        } else {
          return (
            <p key={QuestionAnswerObj.id} className="QuizView-question-grey">
              {answers.map((answerObj) => {
                if (answerObj.id === QuestionAnswerObj.answerId) {
                  return answerObj.name;
                }
              })}
            </p>
          );
        }
      })}
    </div>
  );
};

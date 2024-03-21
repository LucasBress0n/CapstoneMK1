export const CreateAnswerDropdown = ({
  answers,
  questionsAnswers,
  setQuestionsAnswers,
  selectedQuestion,
}) => {
  return (
    <select
      className="create-answers-dropdown"
      onChange={(evt) => {
        answers.map((answersObj) => {
          if (answersObj.id === parseInt(evt.target.value)) {
            const copy = [...questionsAnswers];

            let answerId = 0;
            if (questionsAnswers.length === 0) {
              answerId = 1;
            } else {
              questionsAnswers.map((answer) => {
                answerId = answer.id + 1;
              });
            }

            copy.push({
              id: answerId,
              questionId: selectedQuestion.id,
              answerId: answersObj.id,
              isCorrect: false,
            });
            evt.target.value = 0;

            setQuestionsAnswers(copy);
          }
        });
      }}
    >
      <option value={0}>Select an Answer</option>
      {answers.map((answersObj) => {
        return (
          <option key={answersObj.id} value={answersObj.id}>
            {answersObj.name}
          </option>
        );
      })}
    </select>
  );
};

export const CreateAnswerInput = ({
  answers,
  answerObj,
  handleDeleteAnswer,
  handleUpdateAnswerBoolean,
}) => {
  return answers.map((answersArray) => {
    if (answerObj.answerId === answersArray.id) {
      return (
        <div key={answersArray.id} className="create-answer-flex">
          <p className="create-answers-input">{answersArray.name}</p>
          <div>
            <label className="create-checkbox">
              {answerObj?.isCorrect ? (
                <input
                  defaultChecked
                  type="checkbox"
                  onChange={() => {
                    handleUpdateAnswerBoolean(answerObj);
                  }}
                />
              ) : (
                <input
                  type="checkbox"
                  onChange={() => {
                    handleUpdateAnswerBoolean(answerObj);
                  }}
                />
              )}
              <p className="text-size-small">Correct?</p>
            </label>
            <button
              className="CreateView-delete-btn"
              onClick={() => {
                handleDeleteAnswer(answerObj);
              }}
            >
              🗑️
            </button>
          </div>
        </div>
      );
    }
  });
};

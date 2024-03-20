export const createAndPostQuiz = (quizObj) => {
  return fetch(`http://localhost:8080/quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quizObj),
  }).then((res) => res.json());
};

export const createAndPostQuestion = (question) => {
  return fetch(`http://localhost:8080/question`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(question),
  }).then((res) => res.json());
};

export const createAndPostQuestionAnswer = (answer) => {
  return fetch(`http://localhost:8080/questionAnswers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answer),
  }).then((res) => res.json());
};

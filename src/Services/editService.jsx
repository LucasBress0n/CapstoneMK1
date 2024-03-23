export const getQuizAndQuestionsById = (id) => {
  return fetch(`http://localhost:8080/quiz/${id}?_embed=question`).then((res) =>
    res.json()
  );
};

export const getQuestionAnswersById = (id) => {
  return fetch(`http://localhost:8080/questionAnswers?questionId=${id}`).then(
    (res) => res.json()
  );
};

export const updateQuiz = (quiz) => {
  return fetch(`http://localhost:8080/quiz/${quiz.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quiz),
  }).then((res) => res.json());
};

export const updateQuestions = (question) => {
  return fetch(`http://localhost:8080/question/${question.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(question),
  }).then((res) => res.json());
};

export const postQuestion = (question) => {
  return fetch(`http://localhost:8080/question`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(question),
  }).then((res) => res.json());
};

export const updateQuestionsAnswers = (questionAnswer) => {
  return fetch(`http://localhost:8080/questionAnswers/${questionAnswer.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(questionAnswer),
  }).then((res) => res.json());
};

export const postQuestionAnswer = (questionAnswer) => {
  return fetch(`http://localhost:8080/questionAnswers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(questionAnswer),
  }).then((res) => res.json());
};

export const deleteQuestion = (yeetedId) => {
  const deleteOption = {
    method: "DELETE",
  };
  const sendback = fetch(
    `http://localhost:8080/question/${yeetedId.id}`,
    deleteOption
  );
};

export const deleteAnswer = (yeetedId) => {
  const deleteOption = {
    method: "DELETE",
  };
  const sendback = fetch(
    `http://localhost:8080/questionAnswers/${yeetedId.id}`,
    deleteOption
  );
};

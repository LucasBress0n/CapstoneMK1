export const getQuizByQuizId = (quizId) => {
  return fetch(`http://localhost:8080/quiz/${quizId}?_expand=user`).then(
    (res) => res.json()
  );
};

export const getQuestionByQuizId = (quizId) => {
  return fetch(
    `http://localhost:8080/question/?quizId=${quizId.id}&_embed=questionAnswers`
  ).then((res) => res.json());
};

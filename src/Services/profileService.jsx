export const getUserProfileAndQuizzesById = (currentUser) => {
  return fetch(
    `http://localhost:8080/users/${currentUser.id}/?_embed=quiz`
  ).then((res) => res.json());
};

export const getAllQuestionsByQuizId = (quiz) => {
  return fetch(
    `http://localhost:8080/question/?quizId=${quiz.id}&_embed=questionAnswers`
  ).then((res) => res.json());
};

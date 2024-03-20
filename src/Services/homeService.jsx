export const getAllQuizzesExpandUser = () => {
  return fetch(`http://localhost:8080/quiz?_expand=user`).then((res) =>
    res.json()
  );
};

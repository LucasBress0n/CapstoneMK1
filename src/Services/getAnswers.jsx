export const getAnswers = () => {
  return fetch(`http://localhost:8080/answers`).then((res) => res.json());
};

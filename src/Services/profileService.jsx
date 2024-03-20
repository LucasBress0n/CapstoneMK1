export const getUserProfileAndQuizzesById = (currentUser) => {
  return fetch(
    `http://localhost:8080/users/${currentUser.id}/?_embed=quiz`
  ).then((res) => res.json());
};

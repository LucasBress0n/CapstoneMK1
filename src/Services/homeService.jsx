export const getAllQuizzesExpandUser = () => {
  return fetch(`http://localhost:8080/quiz?_expand=user&_embed=likes`).then(
    (res) => res.json()
  );
};

export const getAllPostsExpandUser = () => {
  return fetch(`http://localhost:8080/post/?_expand=user&_embed=likes`).then(
    (res) => res.json()
  );
};

export const getCurrentUserProfile = (currentUser) => {
  return fetch(`http://localhost:8080/users/${currentUser.id}`).then((res) =>
    res.json()
  );
};

export const postNewPostFromHomeView = (post) => {
  return fetch(`http://localhost:8080/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};

export const getQuizOrPostSettingsByUserId = (object) => {
  return fetch(`http://localhost:8080/settings?userId=${object.userId}`).then(
    (res) => res.json()
  );
};

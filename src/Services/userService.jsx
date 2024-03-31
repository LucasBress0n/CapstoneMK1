export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8080/users?email=${email}`).then((res) =>
    res.json()
  );
};

export const getUserById = (userId) => {
  return fetch(`http://localhost:8080/users/${userId}`).then((res) =>
    res.json()
  );
};

export const getUserByName = (name) => {
  return fetch(`http://localhost:8080/users?name=${name}`).then((res) =>
    res.json()
  );
};

export const createUser = (user) => {
  return fetch("http://localhost:8080/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const deleteQuiz = (id) => {
  const deleteOption = {
    method: "DELETE",
  };
  const sendback = fetch(`http://localhost:8080/quiz/${id.id}`, deleteOption);
};

export const userLikePostOrQuiz = (PostOrQuiz, currentUser) => {
  if (PostOrQuiz.hasOwnProperty("title")) {
    //this is a quiz
    const QuizLikeObj = {
      quizId: PostOrQuiz.id,
      userId: currentUser.id,
    };
    return fetch(`http://localhost:8080/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(QuizLikeObj),
    }).then((res) => res.json());
  } else if (PostOrQuiz.hasOwnProperty("body")) {
    // this is a post
    const PostLikeObj = {
      postId: PostOrQuiz.id,
      userId: currentUser.id,
    };
    return fetch(`http://localhost:8080/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(PostLikeObj),
    }).then((res) => res.json());
  }
};

export const deleteLike = (like) => {
  return fetch(`http://localhost:8080/likes/${like.id}`, {
    method: "DELETE",
  });
};

// BUG IN CODE BECAUSE WHEN POSTING QUIZ OR POST YOU NEED THE LIKES TO CONTAIN THE OBJECT WITH THE NEWLY POSTED THING CAUSING IT TO NOT DELETE ON THE 2nd RUN

export const createUserSettings = (userSettings) => {
  fetch("http://localhost:8080/settings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userSettings),
  });
};

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

export const getAllUsersSettings = (currentUser) => {
  return fetch(`http://localhost:8080/settings/?userId=${currentUser.id}`).then(
    (res) => res.json()
  );
};

export const updateUserSettings = (userSettings) => {
  fetch(`http://localhost:8080/settings/${userSettings.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userSettings),
  });
};

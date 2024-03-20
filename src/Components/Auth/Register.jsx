import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import {
  createUser,
  getUserByName,
  getUserByEmail,
} from "../../Services/userService";

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    displayname: "",
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    const newUser = {
      ...user,
      profilepicture:
        "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
    };

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "signed_user",
          JSON.stringify({
            id: createdUser.id,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        getUserByName(user.name).then((res) => {
          if (res.length > 0) {
            window.alert("Account with that name exists");
          } else {
            registerNewUser();
          }
        });
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <main className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <fieldset className="register-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="name"
              className="register-form-input"
              placeholder="Enter your account name"
              required
              autoFocus
            />
          </div>
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="displayname"
              className="register-form-input"
              placeholder="Enter your display name"
              required
            />
          </div>
        </fieldset>
        <fieldset className="register-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="register-form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <input
              onChange={updateUser}
              type="password"
              id="password"
              className="register-form-input"
              placeholder="Enter your password"
              required
            />
          </div>
        </fieldset>
        <fieldset className="register-fieldset">
          <div>
            <button type="submit">Register</button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};

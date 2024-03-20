import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail } from "../../Services/userService";

export const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (evt) => {
    evt.preventDefault();

    return getUserByEmail(userEmail).then((foundUsers) => {
      if (
        foundUsers[0]?.email === userEmail &&
        foundUsers[0]?.password === userPassword
      ) {
        const user = foundUsers[0];
        localStorage.setItem(
          "signed_user",
          JSON.stringify({
            id: user.id,
          })
        );

        navigate("/home");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <main className="auth-container">
      <form
        onSubmit={(evt) => {
          handleLogin(evt);
        }}
      >
        <input
          className="login-email"
          required
          type="text"
          placeholder="Enter Email Here!"
          onChange={(evt) => {
            setUserEmail(evt.target.value);
          }}
        />
        <input
          className="login-password"
          required
          type="text"
          placeholder="Enter Password Here!"
          onChange={(evt) => {
            setUserPassword(evt.target.value);
          }}
        />
        <input type="submit" value="Log In" />
      </form>
      <section className="register-link">
        <Link to="/register">Sign up?</Link>
      </section>
    </main>
  );
};

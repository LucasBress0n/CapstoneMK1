import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "./LoginAnimation.css";
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
    <>
      <header>
        <Link className="RegisterView-back-to-login-container" to="/home">
          <img
            className="RegisterView-back-to-login"
            src="./src/Components/images/leftArrow.png"
          />
        </Link>
      </header>
      <main className="LoginView-main-container">
        <div className="LoginView-webpage-name">
          <div className="LoginView-animation-welcome">
            <span>W</span>
            <span>e</span>
            <span>l</span>
            <span>c</span>
            <span>o</span>
            <span>m</span>
            <span>e</span>
          </div>
          <div className="LoginView-animation-to">
            <div className="LoginView-animation-to-magnet-left">
              <span>t</span>
            </div>
            <div className="LoginView-animation-to-magnet-right">
              <span>o</span>
            </div>
          </div>
          <div className="LoginView-animation-can-you">
            <span>Can</span>
            <span>You</span>
          </div>
          <div className="LoginView-animation-find-the-answer">
            <span>Find</span>
            <span>the</span>
            <span>answer?</span>
          </div>
        </div>
        <form
          className="auth-container"
          onSubmit={(evt) => {
            handleLogin(evt);
          }}
        >
          <div className="LoginView-user-login-input">
            <input
              className="login-email LoginView-input"
              required
              type="text"
              placeholder="Enter Email Here!"
              onChange={(evt) => {
                setUserEmail(evt.target.value);
              }}
            />
            <input
              className="login-password LoginView-input"
              required
              type="password"
              placeholder="Enter Password Here!"
              onChange={(evt) => {
                setUserPassword(evt.target.value);
              }}
            />
          </div>
          <input
            className="LoginView-login-button"
            type="submit"
            value="Log In"
          />
          <section className="register-link">
            <Link className="LoginView-register-link" to="/register">
              Sign up?
            </Link>
          </section>
        </form>
      </main>
    </>
  );
};

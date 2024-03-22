import { Routes, Route, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { ApplicationViews } from "./Views/ApplicationViews";
import { Authorized } from "./Views/Authorized";
import { Login } from "./Components/Auth/Login";
import { Register } from "./Components/Auth/Register";
import { HomeView } from "./Components/HomeView/HomeView";
import { Navbar } from "./Components/Navbar/Navbar";
import "./App.css";

export const App = () => {
  const [currentUser, setCurrentUser] = useState({});

  const updateCurrentUser = () => {
    const signedUserObj = JSON.parse(localStorage.getItem("signed_user"));
    setCurrentUser(signedUserObj);
  };

  useEffect(() => {
    updateCurrentUser();
  }, []);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="home"
        element={
          <>
            <Navbar
              currentUser={currentUser}
              updateCurrentUser={updateCurrentUser}
            />
            <HomeView currentUser={currentUser} />
          </>
        }
      />

      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews
              currentUser={currentUser}
              updateCurrentUser={updateCurrentUser}
            />
          </Authorized>
        }
      />
    </Routes>
  );
};

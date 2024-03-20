import { Routes, Route, Outlet } from "react-router-dom";
import { Navbar } from "../Components/Navbar/Navbar";
import { useState, useEffect } from "react";
import { CreateView } from "../Components/CreateView/CreateView";
import { QuizView } from "../Components/QuizView/QuizView";
import { ProfileView } from "../Components/ProfileView/ProfileView";
import { EditView } from "../Components/EditView/EditView";

export const ApplicationViews = ({ currentUser, updateCurrentUser }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar
              currentUser={currentUser}
              updateCurrentUser={updateCurrentUser}
            />
            <Outlet />
          </>
        }
      >
        <Route path="explore" element={"Explore"} />
        <Route
          path="create"
          element={<CreateView currentUser={currentUser} />}
        />
        <Route
          path="profile"
          element={<ProfileView currentUser={currentUser} />}
        />
        <Route path="settings" element={"Settings"} />
        <Route path="quiz">
          <Route path=":quizId" element={<QuizView />} />
        </Route>
        <Route path="edit">
          <Route
            path=":editId"
            element={<EditView currentUser={currentUser} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

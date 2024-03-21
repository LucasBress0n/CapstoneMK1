import { getAllQuizzesExpandUser } from "../../Services/homeService";
import "./HomeView.css";
import { useEffect, useState } from "react";
import { HomeViewQuizzes } from "./HomeViewQuizzes/HomeViewQuizzes";

export const HomeView = () => {
  const [allQuizzes, setAllQuizzes] = useState([]);

  useEffect(() => {
    getAllQuizzesExpandUser().then((questionObj) => {
      setAllQuizzes(questionObj);
    });
  }, []);

  return (
    <>
      <div className="HomeView-home-container">
        <div>
          <header className="HomeView-ForYou-Following">
            For you Following
          </header>
        </div>
        <div className="HomeView-allPosts-container">
          {allQuizzes.map((quizObj) => {
            return <HomeViewQuizzes key={quizObj.id} quizObj={quizObj} />;
          })}
        </div>
      </div>
    </>
  );
};

import "./ExploreView.css";
import magnifyingglass from "../images/magnifyingglass.png";
import gear from "../images/gear.png";
import { useState } from "react";
import { useEffect } from "react";
import { getAllQuizzesExpandUser } from "../../Services/homeService";

export const ExploreView = () => {
  const [allQuizzesAndPosts, setAllQuizzesAndPosts] = useState([]);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    getAllQuizzesExpandUser().then((questionObj) => {
      setAllQuizzes(questionObj);
    });
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    const searchedPostsAndQuizzes = allQuizzes.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.quizDate.includes(searchTerm) ||
        item.user.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setFilter(searchedPostsAndQuizzes);
  }, [searchTerm, allQuizzes]);

  useEffect(() => {}, []);

  return (
    <main className="ExploreView-main-container">
      <div className="ExploreView-container">
        <header className="ExploreView-header">
          <img className="ExploreView-searchbar-img" src={magnifyingglass} />
          <input
            className="ExploreView-searchbar-input"
            type="search"
            onChange={(evt) => {
              setSearchTerm(evt.target.value);
            }}
          />
        </header>
        <div className="ExploreView-posts-container">
          {filter.map((quizObj) => {
            return (
              <section key={quizObj.id} className="ExploreView-quiz-section">
                <img className="ExploreView-quiz-banner" src={quizObj.banner} />
                <div className="ExploreView-quiz-userInfo">
                  <p>{quizObj.title}</p>
                  <p>{quizObj.quizDate}</p>
                </div>
                <div className="ExploreView-quiz-authorInfo">
                  <p>{quizObj.user.name}</p>
                </div>
              </section>
            );
          })}
        </div>
      </div>
      <div className="ExploreView-filter-container">
        <header className="ExploreView-filter-header">Filter Settings</header>
        <div className="ExploreView-filter-searchingby">
          <header className="ExploreView-filter-searchingbyText">
            Searching By
          </header>
          <div className="ExploreView-filterQuiz-options-container">
            <input defaultChecked id="title" name="title" type="checkbox" />
            <label htmlFor="title">Title</label>
            <input defaultChecked id="author" name="author" type="checkbox" />
            <label htmlFor="author">Author</label>
            <input defaultChecked id="date" name="date" type="checkbox" />
            <label htmlFor="date">Date</label>
          </div>
        </div>
        <div className="ExploreView-filter-searchingby">
          <header className="ExploreView-filter-searchingbyText ExploreView-type-search">
            Type
          </header>
          <div className="ExploreView-filterQuiz-options-container">
            <input defaultChecked id="quiz" name="quiz" type="checkbox" />
            <label htmlFor="quiz">Quiz</label>
            <input defaultChecked id="Posts" name="Posts" type="checkbox" />
            <label htmlFor="Posts">Posts</label>
          </div>
        </div>
      </div>
    </main>
  );
};

import "./ExploreView.css";
import magnifyingglass from "../images/magnifyingglass.png";
import gear from "../images/gear.png";
import { useState } from "react";
import { useEffect } from "react";
import { getAllQuizzesExpandUser } from "../../Services/homeService";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    const options = {
      Title: true,
      Author: true,
      Date: true,
    };
    setFilterOptions(options);
  }, []);

  useEffect(() => {
    let searchedPostsAndQuizzes = [...allQuizzes];

    // Try having a copy of a copy?
    const array = [];

    if (filterOptions.Title) {
      let copy = [...searchedPostsAndQuizzes];
      copy = searchedPostsAndQuizzes.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (copy.length != 0) {
        copy.map((copyObj) => {
          if (!array.includes(copyObj)) {
            array.push(copyObj);
          }
        });
      }
    }
    if (filterOptions.Author) {
      let copy = [...searchedPostsAndQuizzes];
      copy = searchedPostsAndQuizzes.filter((item) =>
        item.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (copy.length != 0) {
        copy.map((copyObj) => {
          if (!array.includes(copyObj)) {
            array.push(copyObj);
          }
        });
      }
    }
    if (filterOptions.Date) {
      let copy = [...searchedPostsAndQuizzes];
      copy = searchedPostsAndQuizzes.filter((item) =>
        item.quizDate.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (copy.length != 0) {
        copy.map((copyObj) => {
          if (!array.includes(copyObj)) {
            array.push(copyObj);
          }
        });
      }
    }

    setFilter(array);
  }, [searchTerm, allQuizzes]);

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
              <Link
                className="ExploreView-post-link"
                key={quizObj.id}
                to={`/quiz/${quizObj.id}`}
              >
                <section className="ExploreView-quiz-section">
                  <img
                    className="ExploreView-quiz-banner"
                    src={quizObj.banner}
                  />
                  <div className="ExploreView-quiz-userInfo">
                    <p>{quizObj.title}</p>
                    <p>{quizObj.quizDate}</p>
                  </div>
                  <div className="ExploreView-quiz-authorInfo">
                    <p>{quizObj.user.name}</p>
                  </div>
                </section>
              </Link>
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
            <input
              defaultChecked
              onChange={() => {
                filterOptions.Title = !filterOptions.Title;
              }}
              id="title"
              name="title"
              type="checkbox"
            />
            <label htmlFor="title">Title</label>

            <input
              defaultChecked
              onChange={() => {
                filterOptions.Author = !filterOptions.Author;
              }}
              id="author"
              name="author"
              type="checkbox"
            />
            <label htmlFor="author">Author</label>

            <input
              defaultChecked
              onChange={() => {
                filterOptions.Date = !filterOptions.Date;
              }}
              id="date"
              name="date"
              type="checkbox"
            />
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

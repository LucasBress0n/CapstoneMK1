import "./ExploreView.css";
import magnifyingglass from "../images/magnifyingglass.png";
import gear from "../images/gear.png";
import { useState } from "react";
import { useEffect } from "react";
import {
  getAllPostsExpandUser,
  getAllQuizzesExpandUser,
} from "../../Services/homeService";
import { Link } from "react-router-dom";

export const ExploreView = () => {
  const [allQuizzesAndPosts, setAllQuizzesAndPosts] = useState([]);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    getAllQuizzesExpandUser().then((questionObj) => {
      setAllQuizzes(questionObj);
    });
  }, []);

  useEffect(() => {
    getAllPostsExpandUser().then((postObj) => {
      setAllPosts(postObj);
    });
  }, []);

  useEffect(() => {
    const Total = allQuizzes.length + allPosts.length;
    const randomPostAndQuizGen = [];
    const allPostsAndQuizzes = [];
    if (allPosts.length != 0) {
      allPosts.map((postObj) => {
        allPostsAndQuizzes.push(postObj);
      });
    }
    if (allQuizzes.length != 0) {
      allQuizzes.map((quizObj) => {
        allPostsAndQuizzes.push(quizObj);
      });
    }

    while (randomPostAndQuizGen.length !== Total) {
      const randObj = allPostsAndQuizzes[Math.floor(Math.random() * Total)];
      if (!randomPostAndQuizGen.includes(randObj)) {
        randomPostAndQuizGen.push(randObj);
      }
    }

    if (allPostsAndQuizzes.length != 0) {
      setAllQuizzesAndPosts(randomPostAndQuizGen);
    }
  }, [allPosts, allQuizzes]);

  useEffect(() => {
    const options = {
      Title: true,
      Author: true,
      Date: true,
    };
    setFilterOptions(options);
  }, []);

  useEffect(() => {
    let searchedPostsAndQuizzes = [...allQuizzesAndPosts];

    // Try having a copy of a copy?
    const array = [];

    if (filterOptions.Title) {
      let copy = [...searchedPostsAndQuizzes];
      copy = searchedPostsAndQuizzes.filter((item) =>
        item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
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
      copy = searchedPostsAndQuizzes.filter(
        (item) =>
          item?.quizDate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item?.postDate?.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [searchTerm, allQuizzesAndPosts]);

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
          {filter.map((object) => {
            if (object.hasOwnProperty("title")) {
              return (
                <Link
                  className="ExploreView-post-link"
                  key={object.id + object.title}
                  to={`/quiz/${object.id}`}
                >
                  <section className="ExploreView-quiz-section">
                    <img
                      className="ExploreView-quiz-banner"
                      src={object.banner}
                    />
                    <div className="ExploreView-quiz-userInfo">
                      <p>{object.title}</p>
                      <p>{object.quizDate}</p>
                    </div>
                    <div className="ExploreView-quiz-authorInfo">
                      <p>{object.user.name}</p>
                    </div>
                  </section>
                </Link>
              );
            } else {
              return (
                <section className="ExploreView-quiz-section">
                  <Link
                    className="ExploreView-post-link"
                    key={object.id + object.body}
                    to={`/profile/${object.user.id}`}
                  >
                    <img
                      className="ExploreView-quiz-banner"
                      src={object.user.profilepicture}
                    />
                  </Link>
                  <div className="ExploreView-quiz-userInfo">
                    <p>{object.body}</p>
                    <p>{object.postDate}</p>
                  </div>
                  <div className="ExploreView-quiz-authorInfo">
                    <p>{object.user.name}</p>
                  </div>
                </section>
              );
            }
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

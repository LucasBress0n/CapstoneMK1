import { useEffect, useState } from "react";
import "./CreateView.css";
import React from "react";
import { getAnswers } from "../../Services/getAnswers";
import {
  CreateAnswerDropdown,
  CreateAnswerInput,
} from "./CreateAnswer/CreateAnswer";
import {
  createAndPostQuestion,
  createAndPostQuestionAnswer,
  createAndPostQuiz,
} from "../../Services/quizService";
import { useNavigate } from "react-router-dom";

export const CreateView = ({ currentUser }) => {
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [questionsAnswers, setQuestionsAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const quizObj = {
      userId: currentUser.id,
      title: "Unnamed Title",
      banner:
        "https://www.creativefabrica.com/wp-content/uploads/2021/09/28/Comic-speech-bubbles-with-text-quiz-Graphics-17996889-1-1-580x387.jpg",
    };
    setQuiz(quizObj);
  }, [currentUser]);

  useEffect(() => {
    getAnswers().then((AnswerArray) => {
      setAnswers(AnswerArray);
    });
  }, []);

  const handleSaveQuiz = (quizObj) => {
    if (questionsAnswers.length === 0) {
      window.alert(`Add A Question and Answer`);
    } else {
      const submitQuiz = {
        userId: quizObj.userId,
        title: quizObj.title,
        banner: quizObj.banner,
        quizDate: new Date().toLocaleDateString(),
      };

      createAndPostQuiz(submitQuiz).then((createdPost) => {
        const questionsCopy = [...questions];
        questionsCopy.map((questionObj) => {
          const currentQuestionAnswers = questionsAnswers.filter(
            (questionArry) => questionArry.questionId === questionObj.id
          );
          questionObj.quizId = parseInt(createdPost.id);
          delete questionObj.id;
          createAndPostQuestion(questionObj).then((createdQuestion) => {
            currentQuestionAnswers.map((currentQuestionAnswers) => {
              currentQuestionAnswers.questionId = createdQuestion.id;
              delete currentQuestionAnswers.id;
              createAndPostQuestionAnswer(currentQuestionAnswers);
            });
          });
        });
      });
      navigate(`/home`);
    }
  };

  const handleDeleteAnswer = (answerId) => {
    const questionAnswerObj = [...questionsAnswers];
    setQuestionsAnswers(
      questionAnswerObj.filter((answerObj) => answerObj.id != answerId.id)
    );
  };

  const handleDeleteQuestion = (questionObj) => {
    const copyOfQuestionAnswers = [...questionsAnswers];
    setQuestionsAnswers(
      copyOfQuestionAnswers.filter(
        (questionAnswerObj) => questionAnswerObj.questionId != questionObj.id
      )
    );

    const copyOfQuestions = [...questions];
    setQuestions(
      copyOfQuestions.filter((questionsIndex) => questionsIndex != questionObj)
    );

    setSelectedQuestion({});
  };

  const handleUpdateAnswerBoolean = (answerId) => {
    const copyOfQuestionAnswers = [...questionsAnswers];
    copyOfQuestionAnswers.map((answer) => {
      if (answer.id === answerId.id) {
        answer.isCorrect = !answer.isCorrect;
      }
    });

    setQuestionsAnswers(copyOfQuestionAnswers);
  };

  return (
    <>
      <div className="create-container">
        <form
          className="create-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveQuiz(quiz);
          }}
        >
          <fieldset className="create-fieldset">
            <input
              required
              className="create-title"
              placeholder="Enter your Title here"
              onChange={(evt) => {
                quiz.title = evt.target.value;
              }}
            />
            <fieldset className="create-submit-container">
              <input className="create-submit" type="submit" />
              <input
                onChange={(evt) => {
                  quiz.banner = evt.target.value;
                }}
                className="create-banner"
                placeholder="Image URL"
              />
            </fieldset>
          </fieldset>
          <fieldset className="create-add-question">
            <fieldset className="create-border-article">
              <label className="create-nohighlights">Questions</label>
              <button
                className="create-questions-btn"
                onClick={() => {
                  const copy = [...questions];
                  let questionId = 0;
                  if (questions.length === 0) {
                    questionId = 1;
                  } else {
                    questions.map((question) => {
                      questionId = question.id + 1;
                    });
                  }

                  copy.push({
                    id: questionId,
                    quizId: null,
                    questionText: "",
                  });
                  setQuestions(copy);
                  setSelectedQuestion(copy[0]);
                }}
              >
                +
              </button>
              <article
                className="create-questions-container"
                id="questions-container"
              >
                {questions.map((questionObj) => {
                  return (
                    <fieldset className="create-no-border" key={questionObj.id}>
                      <input
                        required
                        id={questionObj.id}
                        className="create-questions-input"
                        placeholder="Question Text"
                        value={questionObj.questionText}
                        onClick={() => {
                          setSelectedQuestion(questionObj);
                        }}
                        onChange={(event) => {
                          setSelectedQuestion(questionObj);
                          const copy = [...questions];
                          copy.map((questObj) => {
                            if (questObj.id === questionObj.id) {
                              questObj.questionText = event.target.value;
                            }
                          });
                          setQuestions(copy);
                        }}
                      />
                      <button
                        className="CreateView-delete-btn"
                        onClick={() => {
                          handleDeleteQuestion(questionObj);
                        }}
                      >
                        🗑️
                      </button>
                    </fieldset>
                  );
                })}
              </article>
            </fieldset>
            <fieldset className="create-border-article">
              <section className="create-answersSelect-container">
                <input
                  disabled
                  className="create-selectedQuestion-input"
                  placeholder="Selected Question"
                />
                {questions.length != 0 && (
                  <CreateAnswerDropdown
                    selectedQuestion={selectedQuestion}
                    answers={answers}
                    questionsAnswers={questionsAnswers}
                    setQuestionsAnswers={setQuestionsAnswers}
                  />
                )}
              </section>
              <article className="create-questionsAnswers-container">
                {questionsAnswers &&
                  questionsAnswers
                    .filter(
                      (answer) => answer.questionId === selectedQuestion.id
                    )
                    .map((answerObj) => {
                      return (
                        <CreateAnswerInput
                          key={answerObj.id}
                          answerObj={answerObj}
                          answers={answers}
                          handleDeleteAnswer={handleDeleteAnswer}
                          handleUpdateAnswerBoolean={handleUpdateAnswerBoolean}
                        />
                      );
                    })}
              </article>
            </fieldset>
          </fieldset>
        </form>
      </div>
    </>
  );
};

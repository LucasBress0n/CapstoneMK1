import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteAnswer,
  deleteQuestion,
  getQuestionAnswersById,
  getQuizAndQuestionsById,
  postQuestion,
  postQuestionAnswer,
  updateQuestions,
  updateQuestionsAnswers,
  updateQuiz,
} from "../../Services/editService";
import "./EditView.css";
import { getAnswers } from "../../Services/getAnswers";
import { getQuestionByQuizId } from "../../Services/testView";

export const EditView = ({ currentUser }) => {
  const [currentQuiz, setCurrentQuiz] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const [allQuestionAnswers, setAllQuestionAnswers] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const [trashbin, setTrashbin] = useState([]);
  const { editId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getQuizAndQuestionsById(editId).then((data) => {
      setCurrentQuiz(data);
    });
  }, [currentUser]);

  useEffect(() => {
    getQuestionByQuizId(currentQuiz).then((quizArr) => {
      setAllQuestions(quizArr);
    });
  }, [currentQuiz]);

  useEffect(() => {
    const buildArr = [];
    allQuestions?.map((questionAnswersArray) => {
      questionAnswersArray?.questionAnswers?.map((questionAnsObj) => {
        if (questionAnsObj?.questionId === selectedQuestion) {
          buildArr.push(questionAnsObj);
        }
      });
    });
    setAllQuestionAnswers(buildArr);
  }, [selectedQuestion, allQuestions]);

  useEffect(() => {
    getAnswers().then((answersArray) => {
      setAllAnswers(answersArray);
    });
  }, []);

  useEffect(() => {
    if (currentUser.id != undefined && currentQuiz.userId != undefined) {
      if (currentUser.id !== currentQuiz.userId) {
        navigate(`/home`);
      }
    }
    console.log(currentUser.id);
    console.log(currentQuiz.userId);
  }, [currentUser, currentQuiz]);

  const handleFinalize = (e) => {
    e.preventDefault();

    trashbin.map((trashbinObj) => {
      if (!trashbinObj.hasOwnProperty("isNew")) {
        if (trashbinObj.hasOwnProperty("quizId")) {
          deleteQuestion(trashbinObj);
        } else if (trashbinObj.hasOwnProperty("questionId")) {
          deleteAnswer(trashbinObj);
        }
      }
    });

    const copyOfQuiz = { ...currentQuiz };
    delete copyOfQuiz.question;
    const copyOfQuestions = structuredClone(allQuestions);
    const copyOfQuestionAnswers = structuredClone(allQuestions);
    updateQuiz(copyOfQuiz).then((updatedQuiz) => {
      // Updates the Quiz and returns it's values back.
      //------------
      // After uploading the quiz to the database I then want to first upload the questions, Then I want to upload the questions answers
      copyOfQuestions.map((questionObj) => {
        if (!questionObj.hasOwnProperty("isNew")) {
          // If the current Question is not New
          delete questionObj.questionAnswers;
          questionObj.quizId = updatedQuiz.id;
          // Removes The questions Questions Answers so they wont be uploaded to the database
          updateQuestions(questionObj).then((updatedQuestion) => {
            copyOfQuestionAnswers.map((questionsObj) => {
              // go through each Question
              if (questionsObj.id === questionObj.id) {
                // If the Question matches the updated Question
                questionsObj.questionAnswers.map((questionAnswerObj) => {
                  // Go through each question and find out If It's new or old
                  if (questionAnswerObj.hasOwnProperty("isNew")) {
                    delete questionAnswerObj.id;
                    delete questionAnswerObj.isNew;
                    questionAnswerObj.questionId = updatedQuestion.id;

                    postQuestionAnswer(questionAnswerObj);
                    // If the current question is new delete everything about it considered new and post is to the questionAnswer Database
                  } else {
                    questionAnswerObj.questionId = updatedQuestion.id;

                    updateQuestionsAnswers(questionAnswerObj);
                  }
                });
              }
            });
          });
        } else if (questionObj.hasOwnProperty("isNew")) {
          // This one will ONLY be thin gs with isNew
          const questionObjsOldId = questionObj.id;
          const questionObjsQuestionAnswers = questionObj.questionAnswers;
          delete questionObj.isNew;
          delete questionObj.questionAnswers;
          delete questionObj.id;
          questionObj.quizId = updatedQuiz.id;

          postQuestion(questionObj).then((postedQuestion) => {
            copyOfQuestionAnswers.map((questObj) => {
              if (questObj.id === questionObjsOldId) {
                questionObjsQuestionAnswers.map((questionAnswerObj) => {
                  delete questionAnswerObj.id;
                  delete questionAnswerObj.isNew;
                  questionAnswerObj.questionId = postedQuestion.id;

                  postQuestionAnswer(questionAnswerObj);
                });
              }
            });
          });
        }
      });
    });
    navigate(`/profile`);
  };

  return (
    <div className="EditView-main-container">
      <form
        onSubmit={(e) => {
          handleFinalize(e);
        }}
      >
        <header className="EditView-header">
          <div className="EditView-head">
            <input
              className="EditView-title"
              onChange={(event) => {
                const copy = { ...currentQuiz };
                copy.title = event.target.value;
                setCurrentQuiz(copy);
              }}
              defaultValue={currentQuiz?.title ? currentQuiz.title : ``}
            />
            <div className="EditView-submit-container">
              <button type="submit">Finalize</button>
              <input
                onChange={(event) => {
                  const copy = [...currentQuiz];
                  copy.banner = event.target.value;
                  setCurrentQuiz(copy);
                }}
                defaultValue={currentQuiz?.banner ? currentQuiz.banner : ``}
              />
            </div>
          </div>
        </header>
        <div className="EditView-options-main-container">
          <div className="EditView-option-container">
            <button
              onClick={(e) => {
                e.preventDefault();
                const copy = [...allQuestions];
                let tempId = 0;
                copy.map((questionObj) => {
                  tempId = questionObj.id + 1;
                });
                const tempInputObj = {
                  questionText: ``,
                  quizId: currentQuiz.id,
                  id: tempId,
                  isNew: true,
                };
                copy.push(tempInputObj);
                setAllQuestions(copy);
              }}
            >
              Add
            </button>
            {currentQuiz &&
              allQuestions?.map((currentObj) => {
                return (
                  <div key={currentObj.id} className="EditView-option">
                    <input
                      className="EditView-input-question"
                      required
                      onClick={() => {
                        setSelectedQuestion(currentObj.id);
                      }}
                      value={currentObj.questionText}
                      onChange={(evt) => {
                        const copy = [...allQuestions];
                        copy.map((question) => {
                          if (question.id === currentObj.id) {
                            question.questionText = evt.target.value;
                          }
                        });
                        setAllQuestions(copy);
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const trashbinCopy = [...trashbin];
                        trashbinCopy.push(currentObj);
                        setTrashbin(trashbinCopy);

                        let copy = [...allQuestions];
                        copy = copy.filter(
                          (singularObjectInTheArray) =>
                            singularObjectInTheArray != currentObj
                        );
                        setAllQuestions(copy);
                      }}
                    >
                      Del
                    </button>
                  </div>
                );
              })}
          </div>
          <div className="EditView-option-container">
            {allAnswers.length != 0 && (
              <select
                onChange={(evt) => {
                  const copy = [...allQuestions];
                  copy.map((currentObj) => {
                    if (
                      currentObj.id === selectedQuestion &&
                      !currentObj.hasOwnProperty("questionAnswers")
                    ) {
                      let tempId = 0;
                      allQuestions.map((questionObj) => {
                        questionObj?.questionAnswers?.map((questAnsObj) => {
                          if (tempId <= questAnsObj.id) {
                            tempId = questAnsObj.id + 1;
                          }
                        });
                      });
                      const tempQuestionAnswerObj = {
                        answerId: parseInt(evt.target.value),
                        isCorrect: false,
                        questionId: currentObj.id,
                        id: tempId,
                        isNew: true,
                      };
                      currentObj.questionAnswers = [];
                      currentObj.questionAnswers.push(tempQuestionAnswerObj);
                      setAllQuestions(copy);
                    } else if (
                      currentObj.id === selectedQuestion &&
                      currentObj.hasOwnProperty("questionAnswers")
                    ) {
                      let tempId = 0;
                      allQuestions.map((questionObj) => {
                        questionObj?.questionAnswers?.map((questAnsObj) => {
                          if (tempId <= questAnsObj.id) {
                            tempId = questAnsObj.id + 1;
                          }
                        });
                      });
                      const tempQuestionAnswerObj = {
                        answerId: parseInt(evt.target.value),
                        isCorrect: false,
                        questionId: currentObj.id,
                        id: tempId,
                        isNew: true,
                      };
                      currentObj.questionAnswers.push(tempQuestionAnswerObj);
                      setAllQuestions(copy);
                    }
                  });

                  evt.target.value = 0;
                }}
              >
                <option value={0}>--Add an Answer--</option>
                {allAnswers.map((answerObj) => {
                  return (
                    <option key={answerObj.id} value={answerObj.id}>
                      {answerObj.name}
                    </option>
                  );
                })}
              </select>
            )}
            {allQuestionAnswers.length != 0 &&
              allQuestionAnswers?.map((questAnsObj) => {
                return allAnswers?.map((answerObj) => {
                  if (answerObj.id === questAnsObj.answerId) {
                    return (
                      <>
                        <div key={questAnsObj.id} className="EditView-option">
                          <input
                            disabled
                            className="EditView-answer-input"
                            defaultValue={answerObj.name}
                          />
                          {questAnsObj.isCorrect ? (
                            <input
                              defaultChecked
                              type="checkbox"
                              onChange={() => {
                                questAnsObj.isCorrect = !questAnsObj.isCorrect;
                                console.log(questAnsObj);
                              }}
                            />
                          ) : (
                            <input
                              type="checkbox"
                              onChange={() => {
                                questAnsObj.isCorrect = !questAnsObj.isCorrect;
                                console.log(questAnsObj);
                              }}
                            />
                          )}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              const trashbinCopy = [...trashbin];
                              trashbinCopy.push(questAnsObj);
                              setTrashbin(trashbinCopy);

                              const copy = [...allQuestions];

                              copy.map((copiedObjs) => {
                                copiedObjs.questionAnswers =
                                  copiedObjs.questionAnswers.filter(
                                    (filter) => filter != questAnsObj
                                  );
                              });

                              setAllQuestions(copy);
                            }}
                          >
                            Del
                          </button>
                        </div>
                      </>
                    );
                  }
                });
              })}
          </div>
        </div>
      </form>
    </div>
  );
};

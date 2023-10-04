import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContexts } from "../Context/AuthContext";
import api from "../../ApiConfig";
import "./AllQuiz.css";

const AllQuiz = () => {
  const navigateTo = useNavigate();
  const { state } = useContext(AuthContexts);
  const [allQuestions, setAllQuestions] = useState([]);
  const [resultQuestions, setResultQuestions] = useState([]);
  const [myAnswer, setMyAnswer] = useState("");
  const [page, setPage] = useState(1);
  const [timer, setTimer] = useState(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  useEffect(() => {
    if (!state?.currentUser?.name) {
      navigateTo("/login");
      alert("please login first, to start with quiz!");
    }
  }, [navigateTo, state]);

  const IncrementPageCount = () => {
    if (page == resultQuestions?.length) {
      setPage(1);
    } else {
      setPage(page + 1);
    }
  };

  const DecrementPageCount = () => {
    if (page == 1) {
      setPage(resultQuestions?.length);
    } else {
      setPage(page - 1);
    }
  };

  const handleClickValue = (e) => {
    setMyAnswer(e.target.value);
  };

  const handleAnswerSubmit = async (
    question,
    userAnswer,
    rightAnswer,
    questionId
  ) => {
    const token = JSON.parse(localStorage.getItem("Token"));

    try {
      const response = await api.post("/submit-answer", {
        question,
        userAnswer,
        rightAnswer,
        questionId,
        token,
      });

      if (response.data.success) {
        alert(response.data.message);
        setPage(page + 1);
        setMyAnswer("");
        setIsAnswerSubmitted(true);
      } else {
        alert(response.data.message);
        setIsAnswerSubmitted(false);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        const response = await api.post("/get-all-questions", {
          page,
        });

        if (response.data.success) {
          setAllQuestions(response.data.questions);
          setResultQuestions(response.data.allQuestions);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    getAllQuestions();
  }, [page]);

  useEffect(() => {
    if (resultQuestions?.length) {
      if (page > resultQuestions?.length) {
        navigateTo("/quiz-result");
      }
    }
  }, [resultQuestions, page, navigateTo]);

  useEffect(() => {
    let timeLeft = 30;
    var countdownTimer = setInterval(countDown, 1000);
    function countDown() {
      if (timeLeft == 0 || isAnswerSubmitted) {
        clearInterval(countdownTimer);
        setIsAnswerSubmitted(false);
      } else {
        timeLeft--;
      }

      setTimer(timeLeft);
    }
  }, [page, isAnswerSubmitted]);

  return (
    <div id="all-quiz-screen">
      <div id="all-quiz-header">
        <h2>Quiz Question</h2>
      </div>

      {state?.currentUser?.role == "User" && (
        <div id="timer">
          <span>Time Left: </span>
          <h3>{timer}s</h3>
        </div>
      )}
      <div id="all-quiz-questions">
        {allQuestions?.length &&
          allQuestions?.map((ques) => (
            <div id="single-question" key={ques._id}>
              <h3>
                <span>Question:</span> {ques.question}
              </h3>

              {
                <div id="options">
                  <div id="option">
                    <span>option 1:</span>

                    <label htmlFor="html">
                      <input
                        type="radio"
                        name="answer"
                        value={ques.option1}
                        onClick={handleClickValue}
                      />
                      {ques.option1}
                    </label>
                  </div>
                  <br />
                  <div id="option">
                    <span>option 2:</span>

                    <label htmlFor="css">
                      <input
                        type="radio"
                        name="answer"
                        value={ques.option2}
                        onClick={handleClickValue}
                      />
                      {ques.option2}
                    </label>
                  </div>
                  <br />
                  <div id="option">
                    <span>option 3:</span>

                    <label htmlFor="javascript">
                      <input
                        type="radio"
                        name="answer"
                        value={ques.option3}
                        onClick={handleClickValue}
                      />
                      {ques.option3}
                    </label>
                  </div>
                  <br />
                  <div id="option">
                    <span>option 4:</span>

                    <label htmlFor="javascript">
                      <input
                        type="radio"
                        name="answer"
                        value={ques.option4}
                        onClick={handleClickValue}
                      />
                      {ques.option4}
                    </label>
                  </div>
                </div>
              }
              {state?.currentUser?.role == "User" && (
                <div id="selected-answer">
                  <p>
                    {" "}
                    Selected Answer:{" "}
                    <b>{myAnswer ? myAnswer : <span>Not Selected</span>}</b>
                  </p>
                </div>
              )}
              {state?.currentUser?.role == "User" && (
                <button
                  onClick={() =>
                    handleAnswerSubmit(
                      ques.question,
                      myAnswer,
                      ques.answer,
                      ques._id
                    )
                  }
                >
                  Submit Answer
                </button>
              )}
            </div>
          ))}

        <div id="admin-btns">
          {state?.currentUser?.role == "Admin" && (
            <>
              <button onClick={DecrementPageCount}>Prev</button>
              <button onClick={IncrementPageCount}>Next</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllQuiz;

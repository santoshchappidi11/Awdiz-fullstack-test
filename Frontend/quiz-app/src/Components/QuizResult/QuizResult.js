import React, { useEffect, useState } from "react";
import api from "../../ApiConfig";
import { useNavigate } from "react-router-dom";
import "./QuizResult.css";

const QuizResult = () => {
  const [result, setResult] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const navigateTo = useNavigate();

  // console.log(result);

  useEffect(() => {
    const getQuizResult = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token) {
        const response = await api.post("/get-quiz-result", { token });

        if (response.data.success) {
          setResult(response.data.userAnswers);
        }
      }
    };
    getQuizResult();
  }, []);

  useEffect(() => {
    let score = 0;
    for (let i = 0; i < result.length; i++) {
      if (result[i].userAnswer == result[i].rightAnswer) {
        score = score + 1;
      }
    }

    setTotalScore(score);
  }, [result]);

  const takeTestAgain = async () => {
    const token = JSON.parse(localStorage.getItem("Token"));

    if (token) {
      try {
        const response = await api.post("/take-quiz-again", { token });

        if (response.data.success) {
          navigateTo("/");
        } else {
          alert("someting went wrong! try later");
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div id="your-result-screen">
      <div id="your-result-header">
        <h2>Your Results</h2>
      </div>

      <div>
        <h1>Your Score is: {totalScore}</h1>
      </div>

      <div id="all-questions">
        {result?.length &&
          result.map((data) => (
            <div id="question" key={data.questionId}>
              <h3>Question: {data.question}</h3>
              {data.userAnswer == "" ? (
                <p>Your Answer: No answer selected!</p>
              ) : (
                <p>
                  Your Answer: <b>{data.userAnswer}</b>
                </p>
              )}
              <p>
                Right Answer: <b>{data.rightAnswer}</b>
              </p>
            </div>
          ))}
      </div>

      <div id="result-footer">
        <button onClick={takeTestAgain}>Try Quiz Test Again</button>
      </div>
    </div>
  );
};

export default QuizResult;

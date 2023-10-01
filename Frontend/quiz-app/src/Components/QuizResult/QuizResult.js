import React, { useEffect, useState } from "react";
import api from "../../ApiConfig";

const QuizResult = () => {
  const [result, setResult] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  console.log(result);

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

  return (
    <div>
      <div id="result-header">
        <h2>Your Results</h2>
      </div>

      <div>
        <h1>Your Score is: {totalScore}</h1>
      </div>

      <div>
        {result?.length &&
          result.map((data) => (
            <div key={data.questionId}>
              <h3>Question: {data.question}</h3>
              <p>Your Answer:{data.userAnswer}</p>
              <p>Right Answer: {data.rightAnswer}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default QuizResult;

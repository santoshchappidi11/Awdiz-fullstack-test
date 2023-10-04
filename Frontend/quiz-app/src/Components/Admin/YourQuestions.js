import React, { useEffect, useState } from "react";
import api from "../../ApiConfig";
import "./YourQuestions.css";

const YourQuestions = () => {
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    const getAllQuestions = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token) {
        try {
          const response = await api.post("/get-your-questions", { token });

          if (response.data.success) {
            setAllQuestions(response.data.questions);
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    };

    getAllQuestions();
  }, []);

  return (
    <div id="your-questions-screen">
      <div id="your-questions-header">
        <h2>Your Quiz Questions</h2>
      </div>

      <div id="all-questions">
        {allQuestions?.length &&
          allQuestions?.map((ques) => (
            <div id="question" key={ques._id}>
              <h3>
                <span>Question: </span>
                {ques.question}
              </h3>
              <div>
                <p>A) {ques.option1}</p>
                <p>B) {ques.option2}</p>
                <p>C) {ques.option3}</p>
                <p>D) {ques.option4}</p>
              </div>
              <h3>
                <span>Answer: </span>
                {ques.answer}
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default YourQuestions;

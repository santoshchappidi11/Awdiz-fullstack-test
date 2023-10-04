import React, { useState } from "react";
import api from "../../ApiConfig/index";
import { useNavigate } from "react-router-dom";
import "./AddQuestion.css";

const AddQuestion = () => {
  const navigateTo = useNavigate();
  const [questionData, setQuestionData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });

  const handleChangeValues = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const handleQuestionSubmit = async () => {
    if (
      questionData.question &&
      questionData.option1 &&
      questionData.option2 &&
      questionData.option3 &&
      questionData.option4 &&
      questionData.answer
    ) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));

        if (token) {
          const response = await api.post("/add-question", {
            questionData,
            token,
          });

          if (response.data.success) {
            navigateTo("/");
            alert(response.data.message);
          } else {
            alert(response.data.message);
          }
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      alert("Please fill all the fields!");
    }
  };

  return (
    <div id="add-question-screen">
      <div id="add-question-main">
        <div id="add-question-header">
          <h2>Add Question</h2>
        </div>
        <form onSubmit={handleQuestionSubmit}>
          <div>
            <label>Question:</label>
            <input
              type="text"
              name="question"
              onChange={handleChangeValues}
              value={questionData.question}
            />
          </div>
          <br />
          <div>
            <label>Option 1:</label>
            <input
              type="text"
              name="option1"
              onChange={handleChangeValues}
              value={questionData.option1}
            />
          </div>
          <br />
          <div>
            <label>Option 2:</label>
            <input
              type="text"
              name="option2"
              onChange={handleChangeValues}
              value={questionData.option2}
            />
          </div>
          <br />
          <div>
            <label>Options 3:</label>
            <input
              type="text"
              name="option3"
              onChange={handleChangeValues}
              value={questionData.option3}
            />
          </div>
          <br />
          <div>
            <label>Options 4:</label>
            <input
              type="text"
              name="option4"
              onChange={handleChangeValues}
              value={questionData.option4}
            />
          </div>
          <br />
          <div>
            <label>Answer:</label>
            <input
              type="text"
              name="answer"
              onChange={handleChangeValues}
              value={questionData.answer}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;

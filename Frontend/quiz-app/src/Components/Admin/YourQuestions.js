import React, { useEffect, useState } from "react";
import api from "../../ApiConfig";

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
    <div id="home-screen">
      <div id="home-header">
        <h2>Your Quiz Questions</h2>
      </div>

      <div id="all-questions">
        {allQuestions?.length &&
          allQuestions?.map((ques) => (
            <>
              <h3>{ques.question}</h3>
              <div>
                <p>A) {ques.option1}</p>
                <p>B) {ques.option2}</p>
                <p>C) {ques.option3}</p>
                <p>D) {ques.option4}</p>
                <h3>{ques.answer}</h3>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default YourQuestions;

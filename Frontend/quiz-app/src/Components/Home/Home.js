import React, { useContext, useEffect, useState } from "react";
import api from "../../ApiConfig";
import { AuthContexts } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigateTo = useNavigate();
  const { state } = useContext(AuthContexts);
  const [allQuestions, setAllQuestions] = useState([]);
  const [resultQuestions, setResultQuestions] = useState([]);
  const [myAnswer, setMyAnswer] = useState("");
  const [page, setPage] = useState(1);

  console.log(resultQuestions.length, "all ques");
  console.log(page, "page");

  const IncrementPageCount = () => {
    if (page == resultQuestions?.length) {
      setPage(1);
    } else {
      setPage(page + 1);
    }
  };

  const DecrementPageCount = () => {
    if (page == 1) {
      setPage(1);
    } else {
      setPage(page - 1);
    }
  };

  const handleClickValue = (e) => {
    setMyAnswer(e.target.value);
  };

  // const handleChangeValue = (e) => {
  //   setMyAnswer(e.target.value);
  // };

  const handleAnswerSubmit = async (
    question,
    userAnswer,
    rightAnswer,
    questionId
  ) => {
    if (userAnswer) {
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
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      alert("Please fill all the fields!");
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

  return (
    <div id="home-screen">
      <div id="home-header">
        <h2>Quiz Questions</h2>
      </div>

      <div id="all-questions">
        {allQuestions?.length &&
          allQuestions?.map((ques) => (
            <div key={ques._id}>
              <h3>{ques.question}</h3>
              {/* <div>
                <p>A) {ques.option1}</p>
                <p>B) {ques.option2}</p>
                <p>C) {ques.option3}</p>
                <p>D) {ques.option4}</p>
              </div> */}

              {
                <div>
                  <input
                    type="radio"
                    name="answer"
                    value={ques.option1}
                    onClick={handleClickValue}
                  />
                  <label htmlFor="html">{ques.option1}</label>
                  <br />
                  <input
                    type="radio"
                    name="answer"
                    value={ques.option2}
                    onClick={handleClickValue}
                  />
                  <label htmlFor="css">{ques.option2}</label>
                  <br />
                  <input
                    type="radio"
                    name="answer"
                    value={ques.option3}
                    onClick={handleClickValue}
                  />
                  <label htmlFor="javascript">{ques.option3}</label>
                  <br />
                  <input
                    type="radio"
                    name="answer"
                    value={ques.option4}
                    onClick={handleClickValue}
                  />
                  <label htmlFor="javascript">{ques.option4}</label>
                </div>
              }
              <p>{myAnswer}</p>

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
                  Sumit Answer
                </button>
              )}
            </div>
          ))}

        <div>
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

export default Home;

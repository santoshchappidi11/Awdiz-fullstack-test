import React, { useContext, useEffect, useState } from "react";
import api from "../../ApiConfig";
import { AuthContexts } from "../Context/AuthContext";

const Home = () => {
  const { state } = useContext(AuthContexts);
  const [allQuestions, setAllQuestions] = useState([]);
  const [myAnswer, setMyAnswer] = useState("");
  const [page, setPage] = useState(1);

  const IncrementPageCount = () => {
    setPage(page + 1);
  };

  const DecrementPageCount = () => {
    if (page == 1) {
      setPage(1);
    } else {
      setPage(page - 1);
    }
  };

  const handleChangeValue = (e) => {
    setMyAnswer(e.target.value);
  };

  const handleAnswerSubmit = async (e, quizAnswer, quizQuestion) => {
    e.preventDefault();

    if (myAnswer) {
      try {
        const response = await api.post("/submit-answer", {
          myAnswer,
          quizAnswer,
          quizQuestion,
        });

        if (response.data.success) {
          alert(response.data.message);
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
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    getAllQuestions();
  }, [page]);

  return (
    <div id="home-screen">
      <div id="home-header">
        <h2>Quiz Questions</h2>
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
              </div>

              {state?.currentUser?.role == "User" && (
                <form>
                  <input type="text" onChange={handleChangeValue} />
                  <button>Sumit Answer</button>
                </form>
              )}
            </>
          ))}

        <div>
          <button onClick={DecrementPageCount}>Prev</button>
          <button onClick={IncrementPageCount}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Home;

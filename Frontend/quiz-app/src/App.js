import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import AddQuestion from "./Components/Admin/AddQuestion";
import YourQuestions from "./Components/Admin/YourQuestions";
import QuizResult from "./Components/QuizResult/QuizResult";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/add-question" element={<AddQuestion />} />
        <Route exact path="/your-questions" element={<YourQuestions />} />
        <Route exact path="/quiz-result" element={<QuizResult />} />
      </Routes>
    </div>
  );
}

export default App;

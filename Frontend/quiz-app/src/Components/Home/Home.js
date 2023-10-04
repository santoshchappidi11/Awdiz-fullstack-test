import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigateTo = useNavigate();

  return (
    <div id="start-quiz">
      <button onClick={() => navigateTo("/all-quiz")}>Start Quiz</button>
    </div>
  );
};

export default Home;

import { useState, useEffect } from "react";
import Start from "./components/Start/Start.jsx";
import Question from "./components/Question/Question.jsx";
import "./App.css";

export default function App() {
  const [quizActive, setQuizActive] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=5");
        const data = await res.json();
        const formattedData = data.results.map((question) => ({
          ...question,
          isChecked: false,
        }));
        setData(formattedData);
      } catch (e) {
        console.error(e);
      }
    };
    quizActive && getData();
  }, [quizActive]);

  const togglequizActive = () => {
    setQuizActive((oldquizActive) => !oldquizActive);
  };

  const questionElements = data.map((question, i) => {
    return <Question key={i} {...question} />;
  });

  return (
    <>
      <div className="blob blob--right"></div>
      <main className="main">
        <div className="container">
          {data.length === 0 ? <Start /> : questionElements}
          <button className="btn btn--primary" onClick={togglequizActive}>
            {!quizActive ? "Start Quiz" : "Check Answers"}
          </button>
        </div>
      </main>
      <div className="blob blob--left"></div>
    </>
  );
}

import { useState, useEffect } from "react";
import Start from "./components/Start/Start.jsx";
import Question from "./components/Question/Question.jsx";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import "./App.css";

export default function App() {
  const [quizActive, setQuizActive] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=5");
        const newData = await res.json();
        const formattedNewData = newData.results.map((questionData) => ({
          ...questionData,
          question: decode(questionData.question),
          correct_answer: decode(questionData.correct_answer),
          incorrect_answer: decode(questionData.incorrect_answer),
          isChecked: false,
        }));
        setData(formattedNewData);
      } catch (e) {
        console.error(e);
      }
    };
    quizActive && getData();
  }, [quizActive]);

  console.log(data);

  const togglequizActive = () => {
    setQuizActive((oldquizActive) => !oldquizActive);
  };

  const questionComponents = data.map((question) => {
    const id = nanoid();
    return <Question key={id} id={id} {...question} />;
  });

  return (
    <>
      <div className="blob blob--right"></div>
      <main className="main">
        <div className="container">
          {data.length === 0 ? <Start /> : questionComponents}
          <button className="btn btn--primary" onClick={togglequizActive}>
            {!quizActive ? "Start Quiz" : "Check Answers"}
          </button>
        </div>
      </main>
      <div className="blob blob--left"></div>
    </>
  );
}

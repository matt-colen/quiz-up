import { useState, useEffect } from "react";
import Start from "./components/Start/Start.jsx";
import Question from "./components/Question/Question.jsx";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import "./App.css";

export default function App() {
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizData, setQuizData] = useState([]);

  const formatData = (data) =>
    data.results.map((questionData) => {
      const correctAnswer = {
        correct: true,
        isChecked: false,
        text: decode(questionData.correct_answer),
      };
      const incorrectAnswers = questionData.incorrect_answers.map((answer) => ({
        correct: false,
        isChecked: false,
        text: decode(answer),
      }));
      return {
        ...questionData,
        question: decode(questionData.question),
        answers: [correctAnswer, ...incorrectAnswers],
        id: nanoid(),
      };
    });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=5");
        const data = await res.json();
        setQuizData(formatData(data));
      } catch (e) {
        console.error(e);
      }
    };
    isQuizActive && getData();
  }, [isQuizActive]);

  const toggleIsQuizActive = () => {
    setIsQuizActive((previsQuizActive) => !previsQuizActive);
  };

  const handleAnswerClick = () => {
    console.log("clicked");
  };

  const questionComponents = quizData.map((question) => {
    return (
      <Question
        key={question.id}
        {...question}
        handleAnswerClick={handleAnswerClick}
      />
    );
  });

  return (
    <div className="app">
      <div className="blob blob--right"></div>
      <main className="main">
        <div className="container">
          {quizData.length === 0 ? <Start /> : questionComponents}
          <button className="btn btn--primary" onClick={toggleIsQuizActive}>
            {!isQuizActive ? "Start Quiz" : "Check Answers"}
          </button>
        </div>
      </main>
      <div className="blob blob--left"></div>
    </div>
  );
}

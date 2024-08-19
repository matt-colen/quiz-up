import { useState, useEffect } from "react";
import Start from "./components/Start/Start.jsx";
import Question from "./components/Question/Question.jsx";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import "./App.css";

export default function App() {
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [apiError, setApiError] = useState(false);

  const formatData = (incomingQuizData) =>
    incomingQuizData.results.map((question) => {
      const correctAnswer = {
        correct: true,
        isChecked: false,
        text: decode(question.correct_answer),
      };
      const incorrectAnswers = question.incorrect_answers.map((answer) => ({
        correct: false,
        isChecked: false,
        text: decode(answer),
      }));
      return {
        ...question,
        question: decode(question.question),
        answers: [correctAnswer, ...incorrectAnswers],
        id: nanoid(),
      };
    });

  useEffect(() => {
    const getNewData = async () => {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=5");
        if (res.ok) {
          const data = await res.json();
          setApiError(false);
          setQuizData(formatData(data));
        } else {
          throw Error("Network error");
        }
      } catch (e) {
        console.error(e);
        setApiError(true);
      }
    };
    isQuizActive && getNewData();
  }, [isQuizActive]);

  // Keeps the quiz in an inactive state if the api data doesn't come through
  useEffect(() => {
    apiError && setIsQuizActive(false);
  }, [apiError]);

  const toggleIsQuizActive = () => {
    setIsQuizActive((prevIsQuizActive) => !prevIsQuizActive);
  };

  const handleAnswerClick = () => {
    console.log(quizData);
  };

  const questionElements = quizData.map((question) => {
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
          {quizData.length === 0 ? <Start /> : questionElements}
          <button className="btn btn--primary" onClick={toggleIsQuizActive}>
            {!isQuizActive ? "Start Quiz" : "Check Answers"}
          </button>
          {apiError && (
            <p className="error">Something went wrong, please try again</p>
          )}
        </div>
      </main>
      <div className="blob blob--left"></div>
    </div>
  );
}

import { useState, useEffect } from "react";
import Start from "./components/Start/Start.jsx";
import Question from "./components/Question/Question.jsx";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import "./App.css";

export default function App() {
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [score, setScore] = useState(0);

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
        checked: "",
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

  // Keeps the quiz in an inactive state if the api request fails
  useEffect(() => {
    apiError && setIsQuizActive(false);
  }, [apiError]);

  // Updates the score when quiz is complete
  useEffect(() => {
    if (isQuizComplete) {
      const correctAnswers = quizData.map((question) => {
        return question.answers.filter(
          (answer) => answer.isChecked && answer.correct
        );
      });
      const currentScore = correctAnswers.filter(
        (answer) => answer.length > 0
      ).length;
      setScore(currentScore);
    }
  }, [isQuizComplete]);

  const toggleIsQuizActive = () => {
    setIsQuizActive((prevIsQuizActive) => !prevIsQuizActive);
    isQuizActive ? setIsQuizComplete(true) : setIsQuizComplete(false);
  };

  const handleAnswerClick = (target) => {
    const targetIndex = quizData.findIndex((question) => {
      return question.id === target.name;
    });
    const questionIndex = quizData[targetIndex].answers.findIndex((answer) => {
      return answer.text === target.value;
    });

    setQuizData((prevData) => {
      const newData = prevData.map((question, index) => {
        return index === targetIndex
          ? {
              ...question,
              answers: question.answers.map((answer, i) => {
                return i === questionIndex
                  ? { ...answer, isChecked: !answer.isChecked }
                  : { ...answer, isChecked: false };
              }),
            }
          : { ...question };
      });
      return newData;
    });
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

  console.log(score);

  return (
    <div className="app">
      <div className="blob blob--right"></div>
      <main className="main">
        <div className="container">
          {quizData.length === 0 ? <Start /> : questionElements}
          <button className="btn btn--primary" onClick={toggleIsQuizActive}>
            {!isQuizActive && !isQuizComplete
              ? "Start Quiz"
              : isQuizComplete
              ? "New Questions"
              : "Check Answers"}
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

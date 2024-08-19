import { useState } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen/StartScreen.jsx";
import Question from "./components/Question/Question.jsx";
import mockData from "./mockData.js";

export default function App() {
  const [questions, setQuestions] = useState(mockData);

  const questionElements = questions.map((question, i) => {
    return <Question key={i} {...question} />;
  });

  return (
    <>
      <div className="blob blob--right"></div>
      <main className="main">
        <div className="container">
          {questions.length === 0 ? <StartScreen /> : questionElements}
        </div>
      </main>
      <div className="blob blob--left"></div>
    </>
  );
}

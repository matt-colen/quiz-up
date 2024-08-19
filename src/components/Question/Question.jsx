import { useId } from "react";
import "./Question.css";

export default function Question({ question, answers }) {
  const id = useId();

  const handleClick = () => {
    console.log("clicked");
  };

  const inputElements = answers.map((answer) => {
    const inputId = `${id}-${answer}`;
    return (
      <div key={inputId}>
        <label className="answer-btn" htmlFor={inputId}>
          {answer}
        </label>
        <input type="radio" name={id} id={inputId} onChange={handleClick} />
      </div>
    );
  });

  return (
    <div className="question-container">
      <fieldset className="question">
        <legend className="question-txt">{question}</legend>
        <div className="answers">{inputElements}</div>
      </fieldset>
    </div>
  );
}

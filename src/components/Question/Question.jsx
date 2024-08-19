import { useId } from "react";
import "./Question.css";

export default function Question(props) {
  console.log("props", props);
  const id = useId();

  const handleClick = () => {
    console.log("clicked");
  };

  const answers = [props.correct_answer, ...props.incorrect_answers]

  const inputElements = answers.map((answer) => {
    const inputId = `${id}-${answer}`;
    return (
      <div key={inputId}>
        <label className="answer-btn" htmlFor={inputId}>
          {answer}
        </label>
        <input
          type="radio"
          name={id}
          id={inputId}
          onChange={handleClick}
          checked={props.isChecked}
        />
      </div>
    );
  });

  return (
    <div className="question-container">
      <fieldset className="question">
        <legend className="question-txt">{props.question}</legend>
        <div className="answers">{inputElements}</div>
      </fieldset>
    </div>
  );
}

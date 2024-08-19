import "./Question.css";

export default function Question({
  correct_answer,
  incorrect_answers,
  id,
  question,
  isChecked,
}) {
  const handleClick = () => {
    console.log("clicked");
  };

  const answers = [correct_answer, ...incorrect_answers];

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
          checked={isChecked}
        />
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

import "./Question.css";

export default function Question({
  answers,
  id,
  question,
  isChecked,
  handleAnswerClick,
}) {
  const inputElements = answers.map((answer) => {
    const inputId = `${id}-${answer.text}`;
    return (
      <div key={inputId}>
        <label
          className="answer-btn"
          style={{ background: answer.isChecked ? "#D6DBF5" : "" }}
          htmlFor={inputId}
        >
          {answer.text}
        </label>
        <input
          type="radio"
          name={answer.id}
          id={inputId}
          onChange={(e) => handleAnswerClick(e.target.id)}
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

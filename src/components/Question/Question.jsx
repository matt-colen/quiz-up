import "./Question.css";

export default function Question({
  answers,
  id,
  question,
  isChecked,
  handleAnswerClick,
  isQuizComplete,
}) {
  const inputElements = answers.map((answer) => {
    const inputId = `${id}-${answer.text}`;

    return (
      <div className="answer" key={inputId}>
        <label
          className="answer-btn"
          style={
            isQuizComplete
              ? {
                  background: answer.correct
                    ? "#94D7A2"
                    : answer.isChecked
                    ? "#F8BCBC"
                    : "",
                  opacity: answer.correct ? "1" : ".5",
                }
              : { background: answer.isChecked ? "#D6DBF5" : "" }
          }
          htmlFor={inputId}
        >
          {answer.text}
        </label>
        <input
          type="radio"
          name={id}
          id={inputId}
          value={answer.text}
          onChange={(e) => handleAnswerClick(e.target)}
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

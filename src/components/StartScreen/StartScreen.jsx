import "./StartScreen.css";

export default function StartScreen() {
  return (
    <section className="start-container">
      <h1 className="title">Quiz App</h1>
      <h3 className="subheader">Test your knowledge now</h3>
      <button className="btn btn--primary">Start quiz</button>
    </section>
  );
}

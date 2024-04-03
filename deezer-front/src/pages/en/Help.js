import { Link } from "react-router-dom";

const HelpEn = () => {
  return (
    <div>
      <h1>Help</h1>
      <h2>Create</h2>
      <p>
        Create allows you to create a musical quizz fixed on a database. It'll
        never change. Every person playing on this quizz will have the same
        answers.
      </p>
      <p>
        You can create from you own private playlists you liked or public ones.
      </p>
      <h2>Playlists</h2>
      <p>
        Playlists allows you to search for already created quizz. You can play
        it again.
      </p>
      <h2>Play</h2>
      <p>Play create a quizz instance</p>
      <p>
        <strong>WARNING</strong>, you need the quizz ID before playing it. A
        username is also asked to record your score.
      </p>
      <br />
      <p>Every data is stored in local on JSON files.</p>
      <h3>
        <Link to="/en/">Home</Link>
      </h3>
    </div>
  );
};

export default HelpEn;

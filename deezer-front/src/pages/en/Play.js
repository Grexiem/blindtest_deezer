import { useParams, Link } from "react-router-dom";
import Cookies from 'universal-cookie';

function PlayEn() {
  const { id } = useParams();
  function setBlindtest(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson["id"]);
    window.location.href =
      "/en/choice/" + formJson["id"] + "/1/" + formJson["player_name"];
  }

  return (
    <div>
      <h1>Play</h1>
      <form method="post" onSubmit={setBlindtest}>
        <h3>Quizz ID :</h3> <input name="id" defaultValue={id} />
        <h3>Username :</h3>
        <input name="player_name" />
        <button type="submit">Play</button>
      </form>
      <h2>
        <Link to="/en/">Home</Link>
      </h2>
    </div>
  );
}
export default PlayEn;

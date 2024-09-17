import { useParams, Link } from "react-router-dom";
import Cookies from 'universal-cookie';
function Play() {
  const { id } = useParams();
  const cookies = new Cookies(null, { path: '/' });
  const player_cookie = cookies.get("player")
  function setBlindtest(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson["id"]);
    cookies.set("index", 1);
    cookies.set("bt", formJson["id"])
    window.location.href =
      "/choice/" + formJson["id"] + "/1/" + player_cookie;
  }

  return (
    <div>
      <h1>Jouer</h1>
      <form method="post" onSubmit={setBlindtest}>
        <h3>Indiquez l'ID du blindtest :</h3>{" "}
        <input name="id" defaultValue={id} />
        <h3>Indiquez votre pseudo :</h3>
        <h3>{player_cookie}</h3>
        <button type="submit">Jouer</button>
      </form>
      <h2>
        <Link to="/">Accueil</Link>
      </h2>
    </div>
  );
}
export default Play;

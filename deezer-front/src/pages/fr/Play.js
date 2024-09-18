import { Link } from "react-router-dom";
import { setBlindtest } from "../../components/BlindtestFun";
import Cookies from "universal-cookie";
function Play() {
  const cookies = new Cookies(null, { path: "/" });
  const player_cookie = cookies.get("player");
  return (
    <div>
      <h1>Jouer</h1>
      <form
        method="post"
        onSubmit={(e) => {
          setBlindtest(e, "");
        }}
      >
        <h3>Votre pseudo :</h3>
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

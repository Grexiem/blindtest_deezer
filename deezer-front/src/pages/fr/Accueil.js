import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import PlayerName from "./PlayerName";

function Accueil() {
  const cookies = new Cookies(null, { path: "/" });
  const player_cookie = cookies.get("player");

  return (
    <div>
      <h1>Accueil</h1>
      {!player_cookie ? (
        <dialog open>
          <PlayerName />
        </dialog>
      ) : (
        <div></div>
      )}
      <h2>
        <Link to="/create">Créer</Link>
      </h2>
      <h2>
        <Link to="/playlists">Playlists</Link>
      </h2>
      <h2>
        <Link to="/score">Mes Scores</Link>
      </h2>
      <h2>
        <Link to="/help">Aide</Link>
      </h2>
      <span>
        <h3>
          <Link to="/en">English version</Link>
        </h3>
        {player_cookie ? (
          <button
            onClick={() => {
              cookies.remove("player");
              window.location.reload();
            }}
            id="deconnect"
          >
            &#128275;
          </button>
        ) : (
          <p></p>
        )}
      </span>
    </div>
  );
}
export default Accueil;

import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import PlayerName from "./PlayerName";

function AccueilEn() {
  const cookies = new Cookies(null, { path: "/" });
  const player_cookie = cookies.get("player");
  return (
    <div>
      <h1>Home</h1>
      {!player_cookie ? (
        <dialog open>
          <PlayerName />
        </dialog>
      ) : (
        <div></div>
      )}

      <h2>
        <Link to="/en/create">Create</Link>
      </h2>
      <h2>
        <Link to="/en/playlists">Playlists</Link>
      </h2>
      <h2>
        <Link to="/en/score">My Scores</Link>
      </h2>
      <h2>
        <Link to="/en/help">Help</Link>
      </h2>
      <h3>
        <Link to="/">Version française</Link>
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
    </div>
  );
}
export default AccueilEn;

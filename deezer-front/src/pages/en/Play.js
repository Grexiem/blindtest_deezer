import { Link } from "react-router-dom";
import { setBlindtest } from "../../components/BlindtestFun";
import Cookies from "universal-cookie";
function PlayEn() {
  const cookies = new Cookies(null, { path: "/" });
  const player_cookie = cookies.get("player");
  return (
    <div>
      <h1>Play</h1>
      <form
        method="post"
        onSubmit={(e) => {
          setBlindtest(e, "/en");
        }}
      >
        <h3>Username :</h3>
        <h3>{player_cookie}</h3>
        <button type="submit">Play</button>
      </form>
      <h2>
        <Link to="/en/">Home</Link>
      </h2>
    </div>
  );
}
export default PlayEn;

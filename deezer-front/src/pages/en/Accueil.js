import { Link } from "react-router-dom";

function AccueilEn() {
  return (
    <div>
      <h1>Home</h1>
      <h2>
        <Link to="/en/create">Create</Link>
      </h2>
      <h2>
        <Link to="/en/playlists">Playlists</Link>
      </h2>
      <h2>
        <Link to="/en/play/0">Play</Link>
      </h2>
      <h2>
        <Link to="/en/help">Help</Link>
      </h2>
      <h3>
        <Link to="/">Version française</Link>
      </h3>
    </div>
  );
}
export default AccueilEn;

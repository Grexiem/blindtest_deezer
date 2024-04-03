import { Link } from "react-router-dom";

function Accueil() {
  return (
    <div>
      <h1>Accueil</h1>
      <h2>
        <Link to="/create">Créer</Link>
      </h2>
      <h2>
        <Link to="/playlists">Playlists</Link>
      </h2>
      <h2>
        <Link to="/play/0">Jouer</Link>
      </h2>
      <h2>
        <Link to="/help">Aide</Link>
      </h2>
      <h3>
        <Link to="/en">English version</Link>
      </h3>
    </div>
  );
}
export default Accueil;

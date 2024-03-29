import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div>
      <h1>Aide</h1>
      <h2>Créer</h2>
      <p>
        Créer vous permettra de créer un blindtest figé dans une base de
        données. Toute personne qui jouera sur ce blindtest aura les mêmes
        réponses.
      </p>
      <p>
        Vous pouvez créer votre playlist à propos de playlists que vous avez
        likés, de vos coups de coeur, ou bien de playlists publiques.
      </p>
      <h2>Playlists</h2>
      <p>
        Playlists vous permet de trouver les playlists déjà créées pour pouvoir
        vous mesurer à nouveau à vos connaissances.
      </p>
      <h2>Jouer</h2>
      <p>Jouer vous permet de lancer une instance de blindtest.</p>
      <p>
        <strong>ATTENTION</strong>, vous aurez besoin au préalable de l'ID du
        blindtest auquel vous voulez jouer. Un pseudo vous est aussi demandé
        pour conserver le score obtenu.
      </p>
      <br />
      <p>
        Toutes les données utilisées sont stockées sur le serveur créé sous
        format JSON en local.
      </p>
      <h3>
        <Link to="/">Accueil</Link>
      </h3>
    </div>
  );
};

export default Help;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getFirstPlaylists,
  search_playlist,
  create_Blindtest,
} from "../../components/PlaylistFun";
import Cookies from "universal-cookie";

function Create() {
  const [id_blindtest, setId_blindtest] = useState(null);
  const [id_playlist, setId_playlist] = useState(null);
  const [name_playlist, setName_playlist] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const cookies = new Cookies(null, { path: "/" });
  const player_cookie = cookies.get("player");
  useEffect(() => {
    const fetchPlaylist = async () => {
      var temp = await getFirstPlaylists();
      setPlaylists(temp);
    };
    if (playlists == null) {
      fetchPlaylist();
    }
  });
  const handleClick = (pl) => {
    setId_playlist(pl["id"]);
    setName_playlist(pl["title"]);
  };

  const handlePlay = (id) => {
    cookies.set("bt", id);
    window.location.href = "/play";
  };
  return (
    <div>
      <h1>Créer un Blindtest</h1>
      <form
        onSubmit={async (e) => {
          var temp = await search_playlist(e);
          setPlaylists(temp);
        }}
      >
        <input type="text" name="query"></input>
        <br />
        <button type="submit">Rechercher</button>
      </form>
      {name_playlist ? (
        <h3>Playlist choisie : {name_playlist}</h3>
      ) : playlists ? (
        <div id="boutons">
          <h3>
            Choisissez votre playlist de jeu ou bien recherchez-en d'autres
          </h3>
          {playlists.map((playlist) => {
            return (
              <button
                onClick={() => {
                  handleClick(playlist);
                }}
              >
                {playlist["title"]} <i>{playlist["creator"]}</i>
              </button>
            );
          })}
        </div>
      ) : (
        <h1> En attente des playlists</h1>
      )}
      <h2>Choisissez le nombre de round du blindtest</h2>
      <form
        onSubmit={async (e) => {
          var temp = await create_Blindtest(e, id_playlist);
          setId_blindtest(temp);
        }}
      >
        <input type="number" name="nb_round" min="1" max="100"></input>
        <br />
        <h3>Pseudo Créateur :</h3>
        <h3>{player_cookie}</h3>
        <button type="submit">Créer</button>
      </form>
      {id_blindtest ? (
        <div>
          {id_blindtest !== "ERROR" ? (
            <div>
              <h2>L'ID de votre blindtest est :</h2>
              <h3>{id_blindtest}</h3>
              <h3>Retenez-le bien</h3>
              <h2
                onClick={() => {
                  handlePlay(id_blindtest);
                }}
              >
                Play
              </h2>
            </div>
          ) : (
            <h3>
              Une erreur s'est produite ou le nombre de rounds trop élevé pour
              cette playlist
            </h3>
          )}
        </div>
      ) : (
        <p id="error">En attente de création du blindtest</p>
      )}
      <h2>
        <Link to="/">Accueil</Link>
      </h2>
    </div>
  );
}
export default Create;

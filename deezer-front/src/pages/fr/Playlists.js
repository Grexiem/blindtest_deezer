import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPlaylists } from "../../components/PlaylistFun";
import Cookies from "universal-cookie";

const Playlists = () => {
  const cookies = new Cookies(null, { path: "/" });
  const [playlists, setPlaylists] = useState(null);
  useEffect(() => {
    const fetchPlaylist = async () => {
      var temp = await getPlaylists();
      setPlaylists(temp);
    };
    if (playlists == null) {
      fetchPlaylist();
    }
  });

  const handleClick = (id) => {
    cookies.set("bt", id);
    window.location.href = "/play";
  };

  return (
    <div>
      {playlists ? (
        <div>
          {playlists.map((playlist) => {
            return (
              <h3
                id="playlists"
                onClick={() => {
                  handleClick(playlist._id);
                }}
              >
                Créateur : {playlist.creator}, Nom : {playlist.name}, Rounds :{" "}
                {playlist["blindtest"].length}
              </h3>
            );
          })}
        </div>
      ) : (
        <h3>En Attente des playlists</h3>
      )}
      <h2>
        <Link to="/">Accueil</Link>
      </h2>
    </div>
  );
};

export default Playlists;

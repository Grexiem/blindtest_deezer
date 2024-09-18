import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getFirstPlaylists,
  search_playlist,
  create_Blindtest,
} from "../../components/PlaylistFun";
import Cookies from "universal-cookie";

function CreateEn() {
  const [id_blindtest, setId_blindtest] = useState(null);
  const [id_playlist, setId_playlist] = useState(null);
  const [name_playlist, setName_playlist] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const cookies = new Cookies(null, { path: "/" });

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
    window.location.href = "/en/play";
  };
  return (
    <div>
      <h1>Create a Musical Quizz</h1>
      <form
        onSubmit={async (e) => {
          var temp = await search_playlist(e);
          setPlaylists(temp);
        }}
      >
        <input type="text" name="query"></input>
        <br />
        <button type="submit">Search</button>
      </form>
      {name_playlist ? (
        <h3>Chosen playlists : {name_playlist}</h3>
      ) : playlists ? (
        <div id="boutons">
          <h3>Choose your own playlists or play with other ones.</h3>
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
        <h1>Waiting for playlists</h1>
      )}
      <h2>How many rounds would you want to play ?</h2>
      <form
        onSubmit={async (e) => {
          var temp = await create_Blindtest(e, id_playlist);
          setId_blindtest(temp);
        }}
      >
        <input type="number" name="nb_round" min="1" max="100"></input>
        <br />
        <button type="submit">Create</button>
      </form>
      {id_blindtest ? (
        <div>
          {id_blindtest !== "TOO MUCH" ? (
            <div>
              <h2>Quizz ID is :</h2>
              <h3>{id_blindtest}</h3>
              <h3>Don't forget it</h3>
              <h2
                onClick={() => {
                  handlePlay(id_blindtest);
                }}
              >
                Play
              </h2>
            </div>
          ) : (
            <h3>Too much round for this playlist</h3>
          )}
        </div>
      ) : (
        <p id="error">Waiting</p>
      )}
      <h2>
        <Link to="/en/">Home</Link>
      </h2>
    </div>
  );
}
export default CreateEn;

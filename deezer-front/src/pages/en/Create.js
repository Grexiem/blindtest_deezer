import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CreateEn() {
  const [id_blindtest, setId_blindtest] = useState(null);
  const [id_playlist, setId_playlist] = useState(null);
  const [name_playlist, setName_playlist] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const ip = "http://" + window.location.host.split(":")[0] + ":5000/";

  useEffect(() => {
    if (playlists == null) {
      getFirstPlaylists();
    }
  });
  const getFirstPlaylists = async () => {
    try {
      const response = await fetch(ip + "get_own_playlists");
      const result = await response.json();
      setPlaylists(result["playlists"]);
    } catch (e) {
      console.error("Error fetching data : ", e);
    }
  };

  const search_playlist = async (e) => {
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson["query"]);
    try {
      const response = await fetch(
        ip + "get_specific?query=" + formJson["query"].toString(),
      );
      const result = await response.json();
      setPlaylists(result["playlists"].slice(0, 5));
    } catch (e) {
      console.error("Error fetching data : ", e);
    }
  };

  const create_Blindtest = async (e) => {
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson["nb_round"]);
    try {
      const response = await fetch(
        ip +
          "generate_blindtest/" +
          id_playlist +
          "/" +
          formJson["nb_round"].toString(),
      );
      const result = await response.json();
      setId_blindtest(result["id"]);
    } catch (e) {
      console.error("Error fetching data : ", e);
    }
  };

  const handleClick = (pl) => {
    setId_playlist(pl["id"]);
    setName_playlist(pl["title"]);
  };

  const handlePlay = (id) => {
    window.location.href = "/en/play/" + id;
  };
  return (
    <div>
      <h1>Create a Musical Quizz</h1>
      <form onSubmit={search_playlist}>
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
      <form onSubmit={create_Blindtest}>
        <input type="number" name="nb_round" min="1" max="100"></input>
        <br />
        <button type="submit">Create</button>
      </form>
      {id_blindtest ? (
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
        <p id="error">Waiting</p>
      )}
      <h2>
        <Link to="/en/">Home</Link>
      </h2>
    </div>
  );
}
export default CreateEn;

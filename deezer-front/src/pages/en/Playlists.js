import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PlaylistsEn = () => {
  const [playlists, setPlaylists] = useState(null);
  const ip = "http://" + window.location.host.split(":")[0] + ":5000/";
  useEffect(() => {
    if (playlists == null) {
      getPlaylists();
    }
  });

  const getPlaylists = async () => {
    try {
      const response = await fetch(ip + "get_all_playlists/");
      const result = await response.json();
      setPlaylists(result["playlists"]);
    } catch (e) {
      console.error("Error fetching data : ", e);
    }
  };

  const handleClick = (id) => {
    window.location.href = "/play/" + id;
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
                  handleClick(playlist.id);
                }}
              >
                Name : {playlist.name}, Rounds : {playlist.length}, ID :{" "}
                {playlist.id}
              </h3>
            );
          })}
        </div>
      ) : (
        <h3>Waiting for playlists</h3>
      )}
      <h2>
        <Link to="/en/">Home</Link>
      </h2>
    </div>
  );
};

export default PlaylistsEn;

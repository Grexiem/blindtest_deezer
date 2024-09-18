import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPlaylists } from "../../components/PlaylistFun";
import Cookies from "universal-cookie";

const PlaylistsEn = () => {
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
    window.location.href = "/en/play";
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
                Creator : {playlist.creator}, Name : {playlist.name}, Rounds :{" "}
                {playlist.length}
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

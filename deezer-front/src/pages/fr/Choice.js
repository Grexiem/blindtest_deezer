import { useParams, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import Score from "./Score";
const Choice = () => {
  const [end, setEnd] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [songs, setSongs] = useState(null);
  const [track, setTrack] = useState(null);
  const [scores, setScores] = useState(null);
  const [alreadyAnswered, setAlreadyAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const { id, round, player_name } = useParams();
  const ip = "http://" + window.location.host.split(":")[0] + ":5000/";
  const cookies = new Cookies(null, { path: "/" });
  const player_cookie = cookies.get("player");
  const bt_cookie = cookies.get("bt");
  const index_cookie = cookies.get("index");
  const score_cookie = cookies.get("score");

  useEffect(() => {
    if (answer == null) {
      if (parseInt(round) === 1) {
        setScoreAPI(0);
      }
      getSongs();
      if (scores === null) {
        get_All_Score();
      }
    } else {
      launchMusic();
    }
    if (!end) {
      setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    }
  });

  const get_All_Score = async () => {
    if (end) {
      try {
        setScoreAPI(score_cookie);
        const response = await fetch(ip + "get_all_score/" + id.toString());
        const scores = await response.json();
        setScores(scores["score"]);
        console.log(scores);
      } catch (e) {
        console.error("Error fetching data : ", e);
      }
    }
  };
  const setScoreAPI = async (number) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: number }),
      };
      await fetch(
        ip + "score/" + player_name.toString() + "/" + id.toString() + "/",
        requestOptions,
      );
    } catch (e) {
      console.log(e);
    }
  };

  const calculateTimeLeft = () => {
    if (timeLeft > 0) {
      return timeLeft - 1;
    } else {
      return 0;
    }
  };

  const getSongs = async () => {
    try {
      const response = await fetch(
        ip + "blindtest/" + id.toString() + "/" + round.toString(),
      );
      const result = await response.json();
      if (result["result"] !== "FIN") {
        setAnswer(result["result"]);
        setSongs(result["songs"]);
        setTrack(result["track"]);
      } else {
        setEnd(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = async (song) => {
    if (!alreadyAnswered) {
      if (song.title === answer) {
        let round_score = Math.round((timeLeft * 100) / 30);
        //setScoreAPI(parseInt(score) + round_score);
        cookies.set("score", parseInt(score_cookie) + parseInt(round_score));
      }
      setAlreadyAnswered(true);
      await new Promise((r) => setTimeout(r, 3000));
      const round2 = parseInt(index_cookie) + 1;
      cookies.set("index", round2);
      window.location.href =
        "/choice/" +
        bt_cookie.toString() +
        "/" +
        round2.toString() +
        "/" +
        player_cookie.toString();
    }
  };
  const launchMusic = () => {
    document.getElementById("musicplayer").play();
  };

  return (
    <div>
      {answer ? (
        <div>
          <h1>{timeLeft}</h1>
          <div id="boutons">
            <audio id="musicplayer">
              <source src={track} />
            </audio>
            {songs.map((song) => {
              return (
                <button
                  id="choice"
                  onClick={() => {
                    handleClick(song);
                  }}
                >
                  <img src={song.album} alt=""></img>
                  {song.title}
                  <br></br>
                  <i>{song.artist}</i>
                </button>
              );
            })}
          </div>
        </div>
      ) : end ? (
        <h2>Fin du BlindTest</h2>
      ) : (
        <p id="error">Chargement des musiques</p>
      )}
      <Score score={score_cookie} />
      {scores ? (
        <div>
          {Object.keys(scores).map((name) => (
            <h3>
              {name} : {scores[name]}
            </h3>
          ))}
          <h2>
            <Link to="/">Accueil</Link>
          </h2>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Choice;

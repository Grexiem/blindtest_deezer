import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import Score from "./Score";
import { get_All_Score, getSongs } from "../../components/BlindtestFun";
const Choice = () => {
  const [end, setEnd] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [songs, setSongs] = useState(null);
  const [track, setTrack] = useState(null);
  const [scores, setScores] = useState(null);
  const [alreadyAnswered, setAlreadyAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [ready, setReady] = useState(false);
  const cookies = new Cookies(null, { path: "/" });
  const index_cookie = cookies.get("index");
  const score_cookie = cookies.get("score");

  useEffect(() => {
    const makeScores = async () => {
      var temp = await get_All_Score();
      setScores(temp);
    };
    const get_Songs = async () => {
      var result = await getSongs();
      if (result["result"] !== "FIN") {
        setAnswer(result["result"]);
        setSongs(result["songs"]);
        setTrack(result["track"]);
      } else {
        setEnd(true);
      }
    };
    if (answer == null) {
      get_Songs();
      if (scores === null) {
        if (end) {
          makeScores();
        }
      }
    }
    if (ready === true) {
      let IntervalId = setTimeout(() => {
        setTimeout(setTimeLeft(calculateTimeLeft(timeLeft)));
        if (timeLeft === 0) {
          clearInterval(IntervalId);
        }
      }, 1000);
    }
  });
  const calculateTimeLeft = (timeLeft) => {
    if (timeLeft > 0) {
      return timeLeft - 1;
    } else {
      return 0;
    }
  };
  const handleClick = async (song) => {
    if (!alreadyAnswered) {
      if (song.title === answer) {
        let round_score = Math.round((timeLeft * 100) / 30);
        cookies.set("score", parseInt(score_cookie) + parseInt(round_score));
      }
      setAlreadyAnswered(true);
      await new Promise((r) => setTimeout(r, 3000));
      const round2 = parseInt(index_cookie) + 1;
      cookies.set("index", round2);
      window.location.reload();
    }
  };
  const launchMusic = () => {
    document.getElementById("musicplayer").play();
  };

  return (
    <div>
      {ready === false && !end ? (
        <dialog id="readybox" open>
          <button
            onClick={() => {
              setReady(true);
              launchMusic();
            }}
          >
            Prêt ?
          </button>
        </dialog>
      ) : (
        <div></div>
      )}
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
          {Object.keys(scores)
            .sort((a, b) => (scores[a] < scores[b] ? 1 : -1))
            .map((name) => (
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

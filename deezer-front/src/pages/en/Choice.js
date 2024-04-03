import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ScoreEn from "./Score";
const ChoiceEn = () => {
  const [end, setEnd] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [songs, setSongs] = useState(null);
  const [track, setTrack] = useState(null);
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState(null);
  const [alreadyAnswered, setAlreadyAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const { id, round, player_name } = useParams();
  const ip = "http://" + window.location.host.split(":")[0] + ":5000/";

  useEffect(() => {
    if (answer == null) {
      if (parseInt(round) === 1) {
        setScoreAPI(0);
      }
      getScore();
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
        const response = await fetch(ip + "get_all_score/" + id.toString());
        const scores = await response.json();
        setScores(scores["scores"]);
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
      const response = await fetch(
        ip + "score/" + player_name.toString() + "/" + id.toString() + "/",
        requestOptions,
      );
      const result = await response.json();
      setScore(result["score"]);
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

  const getScore = async () => {
    try {
      const response = await fetch(
        ip + "score/" + player_name.toString() + "/" + id.toString() + "/",
      );
      const result = await response.json();
      setScore(result["score"]);
    } catch (e) {
      console.log(e);
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
        setScoreAPI(parseInt(score) + round_score);
      }
      setAlreadyAnswered(true);
      await new Promise((r) => setTimeout(r, 3000));
      const round2 = parseInt(round) + 1;
      window.location.href =
        "/en/choice/" +
        id.toString() +
        "/" +
        round2.toString() +
        "/" +
        player_name.toString();
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
        <h2>End of the Quiz</h2>
      ) : (
        <p id="error">Loading of songs</p>
      )}
      <ScoreEn score={score} />
      {scores ? (
        <div>
          {Object.keys(scores).map((name) => (
            <h3>
              {name} : {scores[name]}
            </h3>
          ))}
          <h2>
            <Link to="/en/">Home</Link>
          </h2>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ChoiceEn;

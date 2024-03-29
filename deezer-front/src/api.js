import { useState, useEffect } from "react";

function BlindTest() {
  const [answer, setAnswer] = useState(null);
  const [song1, setSong1] = useState(null);
  const [song2, setSong2] = useState(null);
  const [song3, setSong3] = useState(null);
  const [song4, setSong4] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [track, setTrack] = useState(null);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  useEffect(() => {
    const storedAnswer = localStorage.getItem("answer");
    console.log(storedAnswer);
    if (storedAnswer == null || answered === true) {
      getSongs();
      setAnswered(false);
    } else {
      const song_saved1 = localStorage.getItem("song1");
      const song_saved2 = localStorage.getItem("song2");
      const song_saved3 = localStorage.getItem("song3");
      const song_saved4 = localStorage.getItem("song4");
      const track_saved = localStorage.getItem("track");
      setAnswer(storedAnswer);
      setTrack(track_saved);
      setSong1(song_saved1);
      setSong2(song_saved2);
      setSong3(song_saved3);
      setSong4(song_saved4);
    }
    if (track != null) {
      console.log(track);
      //track.current.play();
    }
  });

  const reloadSong = () => {};

  const getSongs = async () => {
    try {
      const response = await fetch("http://localhost:5000/");
      const result = await response.json();
      setAnswer(result["result"]);
      setSong1(result["songs"][0]);
      setSong2(result["songs"][1]);
      setSong3(result["songs"][2]);
      setSong4(result["songs"][3]);
      setTrack(result["track"]);
      localStorage.setItem("answer", result["result"]);
      localStorage.setItem("track", result["track"]);
      localStorage.setItem("song1", result["songs"][0]);
      localStorage.setItem("song2", result["songs"][1]);
      localStorage.setItem("song3", result["songs"][2]);
      localStorage.setItem("song4", result["songs"][3]);
    } catch (e) {
      console.error("Error fetching data : ", e);
    }
  };
  const launchSong = async () => {
    while (track == null) {
      await sleep(1);
    }
    track.current.play();
  };
  const handleClick = () => {
    setAnswered(true);
    setAnswer(null);
    setSong1(null);
    setSong2(null);
    setSong3(null);
    setSong4(null);
    setTrack(null);
  };
  return (
    <div>
      {answer ? (
        <div id="boutons">
          <audio id="musicplayer" autoPlay>
            <source src={track} />
          </audio>
          <button onClick={handleClick}>{song1}</button>
          <button onClick={handleClick}>{song2}</button>
          <button onClick={handleClick}>{song3}</button>
          <button onClick={handleClick}>{song4}</button>
        </div>
      ) : (
        <p id="error">Chargement des musiques</p>
      )}
    </div>
  );
}
export default BlindTest;

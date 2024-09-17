import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";

const Achievment_Table = () => {
  const cookies = new Cookies(null, { path: "/" });
  const player_cookie = cookies.get("player");
  const ip = "http://" + window.location.host.split(":")[0] + ":5000/";

  const [scores, setScores] = useState(null);

  useEffect(() => {
    if (scores == null) {
      get_All_Score();
    }
  });

  const get_All_Score = async () => {
    try {
      const response = await fetch(ip + "get_score/" + player_cookie);
      const scores = await response.json();
      setScores(scores["score"]);
      console.log(scores);
    } catch (e) {
      console.error("Error fetching data : ", e);
    }
  };
  return (
    <div>
      {scores ? (
        <div>
          <h2>Scores :</h2>
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

export default Achievment_Table;

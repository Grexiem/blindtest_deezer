import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { get_All_Score } from "../../components/ScoreFun";

const AchTable = () => {
  const [scores, setScores] = useState(null);

  useEffect(() => {
    const fetchScore = async () => {
      var temp = await get_All_Score();
      setScores(temp);
    };
    if (scores == null) {
      fetchScore();
    }
  });

  return (
    <div>
      <h2>Scores :</h2>
      {scores !== null ? (
        <div>
          {scores
            .sort((a, b) =>
              a["score"] / a["rounds"] < b["score"] / b["rounds"] ? 1 : -1,
            )
            .map((a) => (
              <h3>
                {a["nom"]} : {a["score"]} pts sur {a["rounds"] * 100} (
                {a["score"] / a["rounds"]} %)
              </h3>
            ))}
          <h2>
            <Link to="/">Accueil</Link>
          </h2>
        </div>
      ) : (
        <p>Pas de scores encore enregistrés</p>
      )}
    </div>
  );
};

export default AchTable;
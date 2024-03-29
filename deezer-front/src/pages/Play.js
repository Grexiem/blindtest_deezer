import { useParams, Link } from "react-router-dom";
function Play() {
  const { id } = useParams();
  function setBlindtest(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson["id"]);
    window.location.href =
      "/choice/" + formJson["id"] + "/1/" + formJson["player_name"];
  }

  return (
    <div>
      <h1>Jouer</h1>
      <form method="post" onSubmit={setBlindtest}>
        <h3>Indiquez l'ID du blindtest :</h3>{" "}
        <input name="id" defaultValue={id} />
        <h3>Indiquez votre pseudo :</h3>
        <input name="player_name" />
        <button type="submit">Jouer</button>
      </form>
      <h2>
        <Link to="/">Accueil</Link>
      </h2>
    </div>
  );
}
export default Play;

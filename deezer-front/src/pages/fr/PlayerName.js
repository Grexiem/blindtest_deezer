import Cookies from 'universal-cookie';

const PlayerName = () => {
const ip = "http://" + window.location.host.split(":")[0] + ":5000/";
const cookie = new Cookies("player", { path: '/' });
const get_player = async (e) => {
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson["query"]);
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formJson["query"] }),
      };
      const response = await fetch(
        ip + "get_player/",
        requestOptions
      );
      const result = await response.json();
      cookie.set("player", result["name"])
    } catch (e) {
      console.error("Error fetching data : ", e);
    }
  };

  return (
    <div>
    <h1>Entrez votre pseudo</h1>
      <form onSubmit={get_player}>
        <input type="text" name="query"></input>
        <br />
        <button type="submit">OK</button>
      </form></div>
  );
};

export default PlayerName;

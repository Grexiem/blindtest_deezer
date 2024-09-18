import { get_player } from "../../components/PlayerFun";

const PlayerName = () => {
  return (
    <div>
      <h1>Enter your pseudo :</h1>
      <form onSubmit={get_player}>
        <input type="text" name="query"></input>
        <br />
        <button type="submit">OK</button>
      </form>
    </div>
  );
};

export default PlayerName;

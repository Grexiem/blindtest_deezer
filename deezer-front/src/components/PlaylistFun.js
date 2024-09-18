import Cookies from "universal-cookie";
const ip = "http://" + window.location.host.split(":")[0] + ":5000/";
const cookies = new Cookies(null, { path: "/" });
const player_cookie = cookies.get("player");
export const getPlaylists = async () => {
  try {
    const response = await fetch(ip + "get_all_playlists/");
    const result = await response.json();
    return result["playlists"];
  } catch (e) {
    console.error("Error fetching data : ", e);
  }
};
export const getFirstPlaylists = async () => {
  try {
    const response = await fetch(ip + "get_own_playlists");
    const result = await response.json();
    return result["playlists"];
  } catch (e) {
    console.error("Error fetching data : ", e);
  }
};

export const search_playlist = async (e) => {
  e.preventDefault();

  // Read the form data
  const form = e.target;
  const formData = new FormData(form);
  const formJson = Object.fromEntries(formData.entries());
  console.log(formJson["query"]);
  try {
    const response = await fetch(
      ip + "get_specific?query=" + formJson["query"].toString(),
    );
    const result = await response.json();
    return result["playlists"].slice(0, 5);
  } catch (e) {
    console.error("Error fetching data : ", e);
  }
};

export const create_Blindtest = async (e, id_playlist) => {
  e.preventDefault();

  // Read the form data
  const form = e.target;
  const formData = new FormData(form);
  const formJson = Object.fromEntries(formData.entries());
  console.log(formJson["nb_round"]);
  try {
    const response = await fetch(
      ip +
        "generate_blindtest/" +
        id_playlist +
        "/" +
        player_cookie +
        "/" +
        formJson["nb_round"].toString(),
    );
    const result = await response.json();
    return result["id"];
  } catch (e) {
    console.error("Error fetching data : ", e);
  }
};

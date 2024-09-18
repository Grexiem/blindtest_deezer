import Cookies from "universal-cookie";
const ip = "http://" + window.location.host.split(":")[0] + ":5000/";
const cookies = new Cookies(null, { path: "/" });
const player_cookie = cookies.get("player");
export const get_All_Score = async () => {
  try {
    const response = await fetch(ip + "get_score/" + player_cookie);
    const scores = await response.json();
    return scores["scores"];
  } catch (e) {
    console.error("Error fetching data : ", e);
  }
};

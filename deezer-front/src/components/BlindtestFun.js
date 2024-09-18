import Cookies from "universal-cookie";
const ip = "http://" + window.location.host.split(":")[0] + ":5000/";
const cookies = new Cookies(null, { path: "/" });
const player_cookie = cookies.get("player");
const score_cookie = cookies.get("score");
const bt_cookie = cookies.get("bt");
const index_cookie = cookies.get("index");
export const setBlindtest = (e, str1) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const formJson = Object.fromEntries(formData.entries());
  console.log(formJson["id"]);
  cookies.set("index", 1);
  cookies.set("score", 0);
  window.location.href = str1 + "/choice";
};

export const get_All_Score = async () => {
  try {
    await setScoreAPI(score_cookie);
    const response = await fetch(ip + "get_all_score/" + bt_cookie);
    const scores = await response.json();
    return scores["score"];
  } catch (e) {
    console.error("Error fetching data : ", e);
  }
};
export const setScoreAPI = async (number) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: number }),
    };
    await fetch(
      ip + "score/" + player_cookie + "/" + bt_cookie + "/",
      requestOptions,
    );
  } catch (e) {
    console.log(e);
  }
};

export const calculateTimeLeft = (timeLeft) => {
  if (timeLeft > 0) {
    return timeLeft - 1;
  } else {
    return 0;
  }
};

export const getSongs = async () => {
  try {
    const response = await fetch(
      ip + "blindtest/" + bt_cookie + "/" + index_cookie,
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
};

import Cookies from "universal-cookie";
const ip = "http://" + window.location.host.split(":")[0] + ":5000/";
const cookies = new Cookies(null, { path: "/" });
export const get_player = async (e) => {
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
    const response = await fetch(ip + "get_player/", requestOptions);
    const result = await response.json();
    cookies.set("player", result["name"]);
  } catch (e) {
    console.error("Error fetching data : ", e);
  }
  window.location.reload();
};

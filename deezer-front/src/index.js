import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Create from "./pages/Create";
import Play from "./pages/Play";
import Choice from "./pages/Choice";
import Score from "./pages/Score";
import Playlists from "./pages/Playlists";
import NoPage from "./pages/NoPage";
import Help from "./pages/Help";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Accueil />} />
        <Route path="create" element={<Create />} />
        <Route path="play/:id" element={<Play />} />
        <Route path="choice/:id/:round/:player_name" element={<Choice />} />
        <Route path="score" element={<Score />} />
        <Route path="playlists" element={<Playlists />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

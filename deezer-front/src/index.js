import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/fr/Accueil";
import Create from "./pages/fr/Create";
import Play from "./pages/fr/Play";
import Choice from "./pages/fr/Choice";
import Score from "./pages/fr/Score";
import Playlists from "./pages/fr/Playlists";
import NoPage from "./pages/NoPage";
import Help from "./pages/fr/Help";
import AccueilEn from "./pages/en/Accueil";
import CreateEn from "./pages/en/Create";
import PlayEn from "./pages/en/Play";
import ChoiceEn from "./pages/en/Choice";
import ScoreEn from "./pages/en/Score";
import PlaylistsEn from "./pages/en/Playlists";
import HelpEn from "./pages/en/Help";
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
        <Route path="en" element={<AccueilEn />} />
        <Route path="en/create" element={<CreateEn />} />
        <Route path="en/play/:id" element={<PlayEn />} />
        <Route
          path="en/choice/:id/:round/:player_name"
          element={<ChoiceEn />}
        />
        <Route path="en/score" element={<ScoreEn />} />
        <Route path="en/playlists" element={<PlaylistsEn />} />
        <Route path="en/help" element={<HelpEn />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

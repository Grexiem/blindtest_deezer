import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/fr/Accueil";
import Create from "./pages/fr/Create";
import Play from "./pages/fr/Play";
import Choice from "./pages/fr/Choice";
import Playlists from "./pages/fr/Playlists";
import AchTable from "./pages/fr/AchTable";
import NoPage from "./pages/NoPage";
import Help from "./pages/fr/Help";
import AccueilEn from "./pages/en/Accueil";
import CreateEn from "./pages/en/Create";
import PlayEn from "./pages/en/Play";
import ChoiceEn from "./pages/en/Choice";
import PlaylistsEn from "./pages/en/Playlists";
import HelpEn from "./pages/en/Help";
import AchTableEn from "./pages/en/AchTable";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Accueil />} />
        <Route path="create" element={<Create />} />
        <Route path="play" element={<Play />} />
        <Route path="choice" element={<Choice />} />
        <Route path="score" element={<AchTable />} />
        <Route path="playlists" element={<Playlists />} />
        <Route path="help" element={<Help />} />
        <Route path="en" element={<AccueilEn />} />
        <Route path="en/create" element={<CreateEn />} />
        <Route path="en/play" element={<PlayEn />} />
        <Route path="en/choice" element={<ChoiceEn />} />
        <Route path="en/score" element={<AchTableEn />} />
        <Route path="en/playlists" element={<PlaylistsEn />} />
        <Route path="en/help" element={<HelpEn />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

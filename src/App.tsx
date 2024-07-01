import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Questions from "./pages/QuestionsPage";
import Years from "./pages/YearsPage";
import Mood from "./pages/MoodPage";
import QuestionPage2 from "./components/QuestionsPage";
import ThankYouPage from "./pages/ThankYouPage";
import PlatformSelectionPage from "./pages/PlatformSelectionPage";
import { FilmChoice } from "./pages/FilmChoice";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/questions" element={<Questions />} />
        <Route path="/years" element={<Years />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/platform" element={<PlatformSelectionPage />} />
        <Route path="/thankyou" element={<ThankYouPage />} /> */}

        <Route path="/questions" element={<Questions />} />
        <Route path="/film-choice" element={<FilmChoice />} />
      </Routes>
    </Router>
  );
};

export default App;

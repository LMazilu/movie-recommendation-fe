import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Questions from "./components/QuestionsPage";
import ThankYouPage from "./pages/ThankYouPage";
import { FilmChoice } from "./pages/FilmChoice";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/questions" element={<Questions />} />
        <Route path="/thankyou" element={<ThankYouPage />} /> */}

        <Route path="/questions" element={<Questions />} />
        <Route path="/film-choice" element={<FilmChoice />} />
      </Routes>
    </Router>
  );
};

export default App;

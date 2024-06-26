import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Recommendation } from "./types/Recommendation";
import HomePage from "./pages/HomePage";
import ContentTypePage from "./pages/ContentTypePage";
import GenrePage from "./pages/GenrePage";
import RecommendationPage from "./pages/RecommendationPage";
import GlobalStyle from "./styles/GlobalStyle";

const App: React.FC = () => {
  const [moodAnswers, setMoodAnswers] = useState<string[]>([]);
  const [contentType, setContentType] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );

  const handleMoodSubmit = (answers: string[]) => {
    setMoodAnswers(answers);
  };

  const handleContentTypeSubmit = (type: string) => {
    setContentType(type);
  };

  const handleGenreSubmit = async (genre: string) => {
    setGenre(genre);
    await fetchRecommendation(moodAnswers, contentType, genre);
  };

  const fetchRecommendation = async (
    moodAnswers: string[],
    contentType: string,
    genre: string
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/recommendation",
        {
          moodAnswers,
          contentType,
          genre,
        }
      );
      setRecommendation(response.data);
    } catch (error) {
      console.error("Errore nel generare la raccomandazione:", error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage onSubmit={handleMoodSubmit} />} />
          <Route
            path="/content-type"
            element={<ContentTypePage onSubmit={handleContentTypeSubmit} />}
          />
          <Route
            path="/genre"
            element={<GenrePage onSubmit={handleGenreSubmit} />}
          />
          <Route
            path="/recommendation"
            element={
              recommendation && (
                <RecommendationPage recommendation={recommendation} />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;

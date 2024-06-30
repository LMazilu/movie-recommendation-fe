import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Container from "../styles/Container";

const RecommendationPage: React.FC = () => {
  const location = useLocation();
  const { moodAnswers, contentType, genre } = location.state as {
    moodAnswers: string[];
    contentType: string;
    genre: string;
  };
  const [recommendation, setRecommendation] = useState<string>("");

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3030/api/recommendation",
          {
            moodAnswers,
            contentType,
            genre,
          }
        );
        setRecommendation(response.data);
      } catch (error) {
        console.error("Error fetching recommendation:", error);
      }
    };

    fetchRecommendation();
  }, [moodAnswers, contentType, genre]);

  return (
    <Container className="recommendation-page">
      <h1>Raccomandazione</h1>
      {recommendation ? <p>{recommendation}</p> : <p>Caricamento...</p>}
    </Container>
  );
};

export default RecommendationPage;

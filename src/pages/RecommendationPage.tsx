import React from "react";
import { Recommendation } from "../types/Recommendation";
import Container from "../styles/Container";

interface RecommendationPageProps {
  recommendation: Recommendation;
}

const RecommendationPage: React.FC<RecommendationPageProps> = ({
  recommendation,
}) => {
  return (
    <Container>
      <h2>Raccomandazione</h2>
      <h3>{recommendation.title}</h3>
      <p>{recommendation.description}</p>
      <p>
        <strong>Cast:</strong> {recommendation.cast}
      </p>
      <p>
        <strong>Durata:</strong> {recommendation.duration} minuti
      </p>
      <p>
        <strong>Anno di uscita:</strong> {recommendation.year}
      </p>
    </Container>
  );
};

export default RecommendationPage;

import React from "react";
import { Recommendation } from "../types/Recommendation";

interface RecommendationScreenProps {
  recommendation: Recommendation;
}

const RecommendationScreen: React.FC<RecommendationScreenProps> = ({
  recommendation,
}) => {
  return (
    <div>
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
    </div>
  );
};

export default RecommendationScreen;

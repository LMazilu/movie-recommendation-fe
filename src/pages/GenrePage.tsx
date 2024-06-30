import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../styles/Container";
import Button from "../styles/Button";

const GenrePage: React.FC = () => {
  const location = useLocation();
  const { moodAnswers, contentType } = location.state as {
    moodAnswers: string[];
    contentType: string;
  };
  const navigate = useNavigate();

  const handleGenre = (genre: string) => {
    navigate("/recommendation", { state: { moodAnswers, contentType, genre } });
  };

  return (
    <Container className="genre-page">
      <h1>Quale genere preferisci?</h1>
      <Button onClick={() => handleGenre("azione")}>Azione</Button>
      <Button onClick={() => handleGenre("commedia")}>Commedia</Button>
      <Button onClick={() => handleGenre("drammatico")}>Drammatico</Button>
    </Container>
  );
};

export default GenrePage;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../styles/Container";
import Button from "../styles/Button";

const ContentTypePage: React.FC = () => {
  const location = useLocation();
  const { moodAnswers } = location.state as { moodAnswers: string[] };
  const navigate = useNavigate();

  const handleContentType = (contentType: string) => {
    navigate("/genre", { state: { moodAnswers, contentType } });
  };

  return (
    <Container className="content-type-page">
      <h1>Che tipo di contenuto preferisci?</h1>
      <Button onClick={() => handleContentType("film")}>Film</Button>
      <Button onClick={() => handleContentType("serie")}>Serie</Button>
    </Container>
  );
};

export default ContentTypePage;

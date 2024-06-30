import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../styles/Button";
import Container from "../styles/Container";

const MoodQuestionsPage: React.FC = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
  };

  const handleNext = () => {
    navigate("/content-type", { state: { moodAnswers: answers } });
  };

  return (
    <Container className="mood-questions-page">
      <h1>Come ti senti oggi?</h1>
      <Button onClick={() => handleAnswer("felice")}>Felice</Button>
      <Button onClick={() => handleAnswer("triste")}>Triste</Button>
      <Button onClick={() => handleAnswer("arrabbiato")}>Arrabbiato</Button>
      <Button onClick={handleNext}>Avanti</Button>
    </Container>
  );
};

export default MoodQuestionsPage;

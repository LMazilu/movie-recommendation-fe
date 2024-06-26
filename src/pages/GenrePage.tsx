import React from "react";
import GenreQuestion from "../components/GenreQuestion";
import Container from "../styles/Container";

interface GenrePageProps {
  onSubmit: (genre: string) => void;
}

const GenrePage: React.FC<GenrePageProps> = ({ onSubmit }) => {
  return (
    <Container>
      <h2>Qual è il tuo genere preferito?</h2>
      <GenreQuestion onSubmit={onSubmit} />
    </Container>
  );
};

export default GenrePage;

import React, { useState } from "react";
import Container from "../styles/Container";
import Select from "../styles/Select";
import Button from "../styles/Button";

interface GenreQuestionProps {
  onSubmit: (genre: string) => void;
}

const GenreQuestion: React.FC<GenreQuestionProps> = ({ onSubmit }) => {
  const [genre, setGenre] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(genre);
  };

  return (
    <Container>
      <Select value={genre} onChange={handleChange}>
        <option value="">Seleziona un genere</option>
        <option value="azione">Azione</option>
        <option value="commedia">Commedia</option>
        <option value="dramma">Dramma</option>
        <option value="fantascienza">Fantascienza</option>
        <option value="horror">Horror</option>
      </Select>
      <Button onClick={handleSubmit}>Invia</Button>
    </Container>
  );
};

export default GenreQuestion;

import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "../styles/Container";
import Button from "../styles/Button";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <h2>Benvenuto!</h2>
      <Button onClick={() => navigate("/login")}>Login</Button>
      <Button onClick={() => navigate("/register")}>Registrazione</Button>
      <Button onClick={() => navigate("/mood-questions")}>
        Accedi senza iscrizione
      </Button>
    </Container>
  );
};

export default HomePage;

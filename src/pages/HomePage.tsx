import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/HomePage.css";
import { Header } from "../components/Header";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <Header></Header>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Registrati</button>
      <button onClick={() => navigate("/questions")}>
        Accedi senza iscrizione
      </button>
    </div>
  );
};

export default Home;

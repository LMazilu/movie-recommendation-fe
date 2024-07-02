import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2 className="title" onClick={() => navigate("/")}>Dumbie</h2>
      <button className="button" onClick={() => navigate("/login")}>
        Login
      </button>
      <button className="button" onClick={() => navigate("/register")}>
        Registrati
      </button>
      <button className="button" onClick={() => navigate("/questions")}>
        Accedi senza iscrizione
      </button>
    </div>
  );
};

export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/base/Button";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Benvenuto in Dumbie!</h1>
      <Button onClick={() => navigate("/login")} label="Login" />
      <Button onClick={() => navigate("/register")} label="Registrati" />
      <Button onClick={() => navigate("/questions")} label="Accedi come Guest" />
    </div>
  );
};

export default Home;

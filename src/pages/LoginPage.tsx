import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/Firebase";
import "./styles/HomePage.css";
import { Header } from "../components/Header";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3030/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      navigate("/questions");
    } catch (error) {
      console.error("Errore durante il login: ", error);
    }
  };

  const handleGoogleLogin = async () => {
    signInWithPopup(auth, googleProvider)
      .then(async () => {
        const token = await auth.currentUser?.getIdToken(true);
        console.log(token);
        const response = await axios.post(
          "http://localhost:3030/auth/google-login",
          {
            token,
          }
        );
        console.log("TOKEN FATTO! : " + response.data);
        localStorage.setItem("token", response.data.access_token);
        navigate("/questions");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        throw new Error(
          "Error code: " + errorCode + "\nError Message: " + errorMessage
        );
      });
  };

  return (
    <div className="homepage-container">
      <Header></Header>
      <div className="login">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <p className="subtitle">Perché iscriversi?</p>
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => handleLogin}>ACCEDI</button>
          <button onClick={handleGoogleLogin}>Accedi con Google</button>
          <p className="forgot-password">Email o Password dimenticata?</p>
        </form>
        <button
          type="button"
          className="guest-button"
          onClick={() => navigate("/questions")}
        >
          Accedi senza iscrizione
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

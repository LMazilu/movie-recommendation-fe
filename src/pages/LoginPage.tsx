import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/Firebase";
import "../styles/styles.css";

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
        const response = await axios.post(
          "http://localhost:3030/auth/google-login",
          {
            token,
          }
        );
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
    <div className="container">
      <h2 className="title" onClick={() => navigate("/")}>
        Dumbie
      </h2>
      <div className="subtitle">
        <h1 className="question">Login</h1>
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
          <button className="login-button" onClick={() => handleLogin}>
            ACCEDI
          </button>
          <button className="google-button" onClick={handleGoogleLogin}>
            Accedi con Google
          </button>
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

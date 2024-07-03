import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/Firebase";
import "../styles/styles.css";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3030/auth/login", {
        email,
        password,
      });
      login(response.data.access_token);
      navigate("/");
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
        login(response.data.access_token);
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
          <div className="popup-container">
            <p
              className="subtitle"
              onMouseEnter={() => setShowPopup(true)}
              onMouseLeave={() => setShowPopup(false)}
            >
              Perché iscriversi?
            </p>
            {showPopup && (
              <div className="popup">
                Se ti registri potrai visualizzare le raccomandazioni recenti!
              </div>
            )}
          </div>
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
          <button className="login-button" type="submit">
            ACCEDI
          </button>
          <button className="google-button" onClick={handleGoogleLogin}>
            Accedi con Google
          </button>
          <p
            className="forgot-password"
            onClick={() => navigate("/forgot-password")}
          >
            Email o Password dimenticata?
          </p>
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

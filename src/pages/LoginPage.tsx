import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/Firebase";
import "../styles/styles.css";
import { useAuth } from "../context/AuthContext";

/**
 * Renders the LoginPage component which allows users to log in using their email and password,
 * or using Google authentication. It also provides a link to reset a forgotten password and to
 * access the application without signing up.
 *
 * @return {JSX.Element} The LoginPage component.
 */
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);
  const { login } = useAuth();

  /**
   * Handles the login process by sending a POST request to the server with the user's email and password.
   * If the request is successful, it calls the `login` function with the access token from the response and
   * navigates to the home page. If there is an error, it logs the error to the console.
   *
   * @param {React.FormEvent} e - The event object for the form submission.
   * @return {Promise<void>} A Promise that resolves when the login process is complete.
   */
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

  /**
   * Handles the Google login process by signing in with the Google provider and exchanging the
   * authentication token for an access token. If the login is successful, it calls the `login`
   * function with the access token and navigates to the "/questions" page. If there is an error,
   * it throws an error with the error code and message.
   *
   * @return {Promise<void>} A Promise that resolves when the Google login process is complete.
   * @throws {Error} If there is an error during the login process.
   */
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

import React, { useState } from "react";
import api from "../api/genericApi";
import { useNavigate } from "react-router-dom";

/**
 * Handles the submission of the forgot password form.
 *
 * @param {React.FormEvent} e - The form event.
 * @return {Promise<void>} A promise that resolves when the form submission is complete.
 */
const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/forgot-password", { email });
      setMessage(
        "Congratulazioni! La tua nuova password temporanea è 'movie-app'. Cambiala appena puoi."
      );
    } catch (error) {
      setMessage("Si è verificato un errore reimpostando la tua password.");
    }
  };

  return (
    <div className="container">
      <h2 className="title" onClick={() => navigate("/")}>
        Dumbie
      </h2>
      <h2 className="question">Password dimenticata?</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button className="login-button" type="submit">
          Submit
        </button>
      </form>
      {message && (
        <>
          <p>{message}</p>
          <button
            className="login-button"
            onClick={() => navigate("/reset-password")}
          >
            Reset password
          </button>
          <button className="login-button" onClick={() => navigate("/login")}>
            Vai al login
          </button>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordForm;

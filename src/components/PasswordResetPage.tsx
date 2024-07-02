import React, { useState } from "react";
import api from "../api/genericApi";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (newPassword !== passwordConfirmation) {
        setMessage("Le password non corrispondono");
        return;
      }
      await api.post("/auth/change-password", {
        email,
        oldPassword,
        newPassword,
      });
      setMessage("La tua password è stata cambiata con successo.");
    } catch (error) {
      setMessage("Si è verificato un errore cambiando la tua password.");
    }
  };

  return (
    <div className="container">
      <h2 className="title" onClick={() => navigate("/")}>
        Dumbie
      </h2>
      <h2 className="question">Resetta password</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="input-field"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Vecchia password"
          required
        />
        <input
          className="input-field"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nuova password"
          required
        />
        <input
          className="input-field"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Conferma nuova password"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && (
        <>
          <p>{message}</p>
          <button className="login-button" onClick={() => navigate("/login")}>
            Vai al login
          </button>
        </>
      )}
    </div>
  );
};

export default ResetPasswordForm;

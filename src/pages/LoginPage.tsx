import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../components/base/Input";
import Button from "../components/base/Button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/Firebase";

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
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        throw new Error(
          "Error code: " + errorCode + "\n" + "Error Message: " + errorMessage
        );
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={() => handleLogin} label="Login" />
      </form>
      <Button onClick={handleGoogleLogin} label="Login with Google" />
    </div>
  );
};

export default LoginPage;

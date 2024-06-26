import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Container from "../styles/Container";
import Input from "../styles/Input";
import Button from "../styles/Button";
import { auth, googleProvider } from "../config/Firebase";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/mood-questions");
    } catch (error) {
      console.error("Errore nel login:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/mood-questions");
    } catch (error) {
      console.error("Errore nel login con Google:", error);
    }
  };

  return (
    <Container>
      <h2>Login</h2>
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
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={handleGoogleLogin}>Login con Google</Button>
    </Container>
  );
};

export default LoginPage;

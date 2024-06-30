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
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential?.accessToken;
        // The signed-in user info.
        //const user = result.user;
        //console.log(user);
        //const token = user.idToken;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
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
        // The email of the user's account used.
        //const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    /*
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = auth.currentUser?.getIdToken(true);
      console.log(token);
      //const token = credential?.idToken;

      // Send token to backend
      const response = await axios.post(
        "http://localhost:3030/auth/google-login",
        {
          token,
        }
      );
      // Store the JWT access token received from the backend
      console.log("TOKEN FATTO! : " + response.data);
      localStorage.setItem("token", response.data.access_token);
      navigate("/questions");
    } catch (error) {
      console.error("Errore durante il login: ", error);
    }
    */
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

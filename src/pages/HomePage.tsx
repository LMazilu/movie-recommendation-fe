import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import { useAuth } from "../context/AuthContext";

/**
 * Renders the Home page component.
 *
 * @return {ReactElement} The rendered Home page component.
 */
const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <div className="container">
      <h2 className="title" onClick={() => navigate("/")}>
        Dumbie
      </h2>
      {isLoggedIn ? (
        <>
          <button className="user-button" onClick={() => navigate("/user")}>
            Ciao {user?.email || "User"}
          </button>
          <button className="button" onClick={() => navigate("/questions")}>
            Inizia
          </button>
          <button className="button" onClick={logout}>
            {" "}
            Logout{" "}
          </button>
        </>
      ) : (
        <>
          <button className="button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="button" onClick={() => navigate("/register")}>
            Registrati
          </button>
          <button className="button" onClick={() => navigate("/questions")}>
            Accedi senza iscrizione
          </button>
        </>
      )}
    </div>
  );
};

export default Home;

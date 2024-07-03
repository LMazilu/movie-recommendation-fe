import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import { Recommendation } from "../types/Recommendation";

const UserPage: React.FC = () => {
  const { user, deleteUser, fetchRecommendations } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRecommendations = async () => {
      if (user && user.email) {
        setIsLoading(true);
        try {
          const fetchedRecommendations = await fetchRecommendations(user.email);
          setRecommendations(fetchedRecommendations);
        } catch (error) {
          console.error("Error loading recommendations:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadRecommendations();
  }, [user, fetchRecommendations]);

  const handleLogout = () => {
    deleteUser();
    navigate("/");
  };

  if (!user) {
    return <div>Sto caricando i dati...</div>;
  }

  return (
    <div className="container">
      <h2 className="title" onClick={() => navigate("/")}>
        Dumbie
      </h2>
      <h2 className="question">Informazioni sull'utente</h2>
      <div className="user-info">
        <p className="subtitle">
          <b>Email:</b> {user.email}
        </p>
        <p className="subtitle">
          <b>Admin:</b> {user.isAdmin ? "Yes" : "No"}
        </p>
        <button className="delete-button" onClick={handleLogout}>
          Cancella account
        </button>
        <button className="homepage-button" onClick={() => navigate("/")}>
          Torna alla homepage{" "}
        </button>
      </div>
      <h2 className="question">Risultati recenti</h2>
      {isLoading ? (
        <p className="subtitle">Caricamento risultati...</p>
      ) : recommendations.length === 0 ? (
        <p className="subtitle">Nessun risultato recente trovato.</p>
      ) : (
        <ul className="recommendation-list">
          {recommendations.map((rec, index) => (
            <li key={index}>
              {rec.title} - {rec.year}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserPage;

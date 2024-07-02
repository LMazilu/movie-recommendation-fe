import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import { Recommendation } from "../types/Recommendation";

const UserPage: React.FC = () => {
  const { user, deleteUser, fetchRecommendations } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRecommendations = async () => {
      const fetchedRecommendations = await fetchRecommendations();
      setRecommendations(fetchedRecommendations);
    };
    loadRecommendations();
  }, [fetchRecommendations]);

  const handleLogout = () => {
    deleteUser();
    navigate("/");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="title" onClick={() => navigate("/")}>
        Dumbie
      </h2>
      <h2 className="question">Informazioni sull'utente</h2>
      <div className="user-info">
        <p className="subtitle">Email: {user.email}</p>
        <p className="subtitle">Admin: {user.isAdmin ? "Yes" : "No"}</p>
        <p className="subtitle">Deleted: {user.isDeleted ? "Yes" : "No"}</p>
        <button className="delete-button" onClick={handleLogout}>
          Cancella account
        </button>
        <button className="login-button" onClick={() => navigate("/")}>
          Torna alla homepage{" "}
        </button>
      </div>
      <h2 className="question">Risultati recenti</h2>
      {recommendations.length === 0 ? (
        <p className="subtitle">Nessun risultato recente trovato.</p>
      ) : (
        <>
          <ul className="recommendation-list">
            {recommendations.map((rec, index) => (
              <li key={index}>
                {rec.title} - {rec.year}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default UserPage;

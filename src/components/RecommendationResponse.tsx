import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import { useAuth } from "../context/AuthContext";
import { Recommendation } from "../types/Recommendation";
import { RecommendationResponseType } from "../types/RecommendationResponse";

interface IProps {
  recommendationResponse: RecommendationResponseType;
  handleFilmClick: (film: Recommendation) => void;
  handleRestart: () => void;
}

/**
 * Renders a component that displays a recommendation response based on user's answers.
 *
 * @param {IProps} props - An object containing the recommendation response, a function to handle film click, and a function to handle restart.
 * @param {RecommendationResponseType} props.recommendationResponse - The recommendation response object.
 * @param {(film: Recommendation) => void} props.handleFilmClick - A function to handle film click.
 * @param {() => void} props.handleRestart - A function to handle restart.
 * @return {JSX.Element} The rendered component.
 */
export const RecommendationResponse: React.FC<IProps> = ({
  recommendationResponse,
    handleFilmClick,
  handleRestart
}) => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  return (
    <div className="container">
      <h2 className="title" onClick={() => navigate("/")}>
        Dumbie
      </h2>
      {isLoggedIn ? (
        <button className="user-button" onClick={() => navigate("/user")}>
          Ciao {user?.email || "User"}
        </button>
      ) : (
        <div className="user-button" onClick={() => navigate("/login")}>
          Accedi
        </div>
      )}
      <h2 className="question">
        Sulla base delle tue risposte, il tuo mood è{" "}
        <span className="mood">{recommendationResponse.mood}</span>, ecco alcuni
        film che fanno al caso tuo:
      </h2>

      <div className="options">
        {recommendationResponse.films.map(
          (film: Recommendation, index: number) => (
            <div
              className="option"
              key={index}
              onClick={() => handleFilmClick(film)}
            >
              <img
                src={
                  film.url ||process.env.REACT_APP_URL_NOT_FOUND
                }
                alt={film.title}
              />
              <span>{film.title}</span>
            </div>
          )
        )}
      </div>
      <button className="button" onClick={handleRestart}>
        Cambia mood
      </button>
    </div>
  );
};

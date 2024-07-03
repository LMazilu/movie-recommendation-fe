import { getImageUrl } from "../config/Firebase";
import "../styles/styles.css";
import { Recommendation } from "../types/Recommendation";

interface IProps {
  selectedFilm: Recommendation;
  handleBack: () => void;
}
export const SelectedFilm: React.FC<IProps> = ({
  selectedFilm,
  handleBack
}) => {
    
  const handleWatchTrailer = () => {
    const updatedStr = selectedFilm?.title.replace(" ", "+");
    window.open(
      "https://www.youtube.com/results?search_query=" + updatedStr + " trailer",
      "_blank"
    );
  };

  return (
    <div
      className="film-details-container"
      style={{
        backgroundImage: `url(${
          selectedFilm.url ?? getImageUrl("default", "notfound.png")
        })`,
      }}
    >
      <div className="film-details-overlay">
        <h2 className="film-title">{selectedFilm.title}</h2>
        <p className="film-description">Trama: {selectedFilm.description}</p>
        <p className="film-cast">Cast: {selectedFilm.cast}</p>
        <p className="film-duration">Durata: {selectedFilm.duration}</p>
        <p className="film-year">Anno: {selectedFilm.year}</p>
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
        <button className="trailer-button" onClick={handleWatchTrailer}>
          Guarda trailer
        </button>
      </div>
    </div>
  );
};

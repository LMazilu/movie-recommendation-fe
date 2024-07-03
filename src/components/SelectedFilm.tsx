import React from "react";
import { getImageUrl } from "../config/Firebase";
import "../styles/styles.css";
import { Recommendation } from "../types/Recommendation";

interface IProps {
  selectedFilm: Recommendation;
  handleBack: () => void;
}

export const SelectedFilm: React.FC<IProps> = ({
  selectedFilm,
  handleBack,
}) => {
  const handleWatchTrailer = () => {
    const updatedStr = selectedFilm?.title.replace(" ", "+");
    window.open(
      "https://www.youtube.com/results?search_query=" + updatedStr + " trailer",
      "_blank"
    );
  };

  return (
    <div className="film-details-container">
      <div
        className="film-cover"
        style={{
          backgroundImage: `url(${
            selectedFilm.url ?? getImageUrl("default", "notfound.png")
          })`,
        }}
      ></div>
      <div className="film-details">
        <h2 className="film-title">{selectedFilm.title}</h2>
        <p className="film-description">
          <b>Trama:</b> {selectedFilm.description}
        </p>
        <p className="film-cast">
          <b>Cast:</b> {selectedFilm.cast}
        </p>
        <p className="film-duration">
          <b>Durata:</b> {selectedFilm.duration}
        </p>
        <p className="film-year">
          <b>Anno:</b> {selectedFilm.year}
        </p>
        <div className="button-group">
          <button className="back-button" onClick={handleBack}>
            Back
          </button>
          <button className="trailer-button" onClick={handleWatchTrailer}>
            Guarda trailer
          </button>
        </div>
      </div>
    </div>
  );
};

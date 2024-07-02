import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/genericApi";
import "../styles/styles.css";
import { getImageUrl } from "../config/Firebase";
import Loader from "./loader";
import { GeneratedFilmType } from "../types/GeneratedFilmType";
import { UserResponseType } from "../types/UserResponseType";
import { Recommendation } from "../types/Recommendation";

const Questions = () => {
    const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [recommendationLoaded, setRecommendationLoaded] =
    useState<boolean>(false);
  const [films, setFilms] = useState<GeneratedFilmType>({
    title1: "",
    title2: "",
    title3: "",
    title4: "",
    url1: "",
    url2: "",
    url3: "",
    url4: "",
  });
  const [userResponse, setUserResponse] = useState<UserResponseType>({});
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinalLoading, setIsFinalLoading] = useState(false);
  const [recommendationResponse, setRecommendationResponse] = useState<{
    mood: string;
    films: Recommendation[];
  } | null>(null);
  const [selectedFilm, setSelectedFilm] = useState<Recommendation | null>(null);

  useEffect(() => {
    const getFilms = async () => {
      const response = await api.post("/api/recommendations/random");
      setFilms(response.data);
      setRecommendationLoaded(true);
    };
    if (!recommendationLoaded) {
      getFilms();
    }
  }, [recommendationLoaded]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      if (recommendationLoaded) {
        const allUrls: string[] = [];
        for (const question of questions) {
          if (question.id === "moviePreference") {
            const movieUrls = await Promise.all(
              [films.url1, films.url2, films.url3, films.url4].map(
                async (url) =>
                  url ?? (await getImageUrl("default", "notfound.png"))
              )
            );
            allUrls.push(...movieUrls);
          } else {
            const urls = await Promise.all(
              question.options.map(async (option: string) => {
                const url = await getImageUrl(
                  question.id,
                  option.toLowerCase() + ".png"
                );
                return url ?? (await getImageUrl("default", "notfound.png"));
              })
            );
            allUrls.push(...(urls as string[]));
          }
        }
        setImageUrls(allUrls);
        setIsLoading(false);
      }
    };
    fetchImageUrls();
  }, [recommendationLoaded, films]);

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleAnswer = (answer: string) => {
    setUserResponse((prev) => {
      const updatedResponse = {
        ...prev,
        [questions[currentQuestion].id]: answer,
      };

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setIsFinalLoading(true);
        api.post("/api/recommendations", updatedResponse).then((response) => {
          setRecommendationResponse(response.data);
          setIsFinalLoading(false);
        });
      }
      return updatedResponse;
    });
  };

  const handleFilmClick = (film: Recommendation) => {
    setSelectedFilm(film);
  };

  const handleBack = () => {
    setSelectedFilm(null);
  };

  const handleRestart = () => {
    setUserResponse({});
    setSelectedFilm(null);
    setCurrentQuestion(0);
    setRecommendationResponse(null);
  };

  const handleWatchTrailer = () => {
    const updatedStr = selectedFilm?.title.replace(" ", "+");
    window.open(
      "https://www.youtube.com/results?search_query=" + updatedStr + " trailer",
      "_blank"
    );
  };

  const questions = [
    {
      id: "topic",
      question: "Cosa ti appassiona oggi?",
      options: ["Natura", "Generazioni", "Politica", "Viaggio"],
    },
    {
      id: "years",
      question: "Quale annata preferisci?",
      options: ["1920-1950", "1950-1970", "1970-1990", "1990-2020"],
    },
    {
      id: "feeling",
      question: "Come ti senti oggi?",
      options: ["Relax", "Triste", "Party", "Avventuroso"],
    },
    {
      id: "moviePreference",
      question: "Quale tra questi film ti piace di più?",
      options: [films.title1, films.title2, films.title3, films.title4],
    },
    {
      id: "platform",
      question: "Quale piattaforma vuoi usare?",
      options: ["Netflix", "Prime Video", "Disney+", "AppleTV+"],
    },
    {
      id: "contentType",
      question: "Cosa vuoi vedere?",
      options: ["Film", "Serie TV", "Cartone", "Docu"],
    },
    {
      id: "genre1",
      question: "Di che genere hai voglia?",
      options: ["Commedia", "Azione", "Horror", "Sci-fi"],
    },
    {
      id: "genre2",
      question: "Ancora una volta: di che genere hai voglia?",
      options: ["Comico", "Inchiesta", "Drama", "Romantico"],
    },
  ];

  if (isFinalLoading) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  if (selectedFilm) {
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
  }

  if (recommendationResponse) {
    return (
      <div className="container">
            <h2 className="title" onClick={() => navigate("/")}>Dumbie</h2>
        <h2 className="question">
          Sulla base delle tue risposte, il tuo mood è{" "}
          <span className="mood">{recommendationResponse.mood}</span>, ecco
          alcuni film che fanno al caso tuo:
        </h2>

        <div className="options">
          {recommendationResponse.films.map(
            (film: Recommendation, index: number) => (
              <div
                className="option"
                key={index}
                onClick={() => handleFilmClick(film)}
              >
                <img src={film.url} alt={film.title} />
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
  }

  return (
    <div className="container">
      {isLoading ? (
        <div className="loading-container">
          <Loader />
        </div>
      ) : (
        <>
          <h2 className="title" onClick={() => navigate("/")}>
            Dumbie
          </h2>
          {recommendationLoaded && (
            <>
              <h2 className="question">
                {questions[currentQuestion].question}
              </h2>
              <div className="options">
                {questions[currentQuestion].options.map(
                  (option: string, index: number) => (
                    <div
                      className="option"
                      key={option}
                      onClick={() => handleAnswer(option)}
                    >
                      {imageUrls[index + currentQuestion * 4] && (
                        <img
                          src={imageUrls[index + currentQuestion * 4]}
                          alt={option}
                        />
                      )}
                      <span>{option}</span>
                    </div>
                  )
                )}
              </div>
              <div className="footer">
                Domanda {currentQuestion + 1}/{questions.length}
              </div>
              {currentQuestion > 0 && (
                <button className="previous-button" onClick={handlePrevious}>
                  &lt;
                </button>
              )}
              <button className="button" onClick={handleRestart}>
                Cambia mood
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Questions;

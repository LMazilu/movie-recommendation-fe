import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/genericApi";
import "./style.css";
import { getImageUrl } from "../config/Firebase";
import Loader from "./loader";

const Questions = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [recommendationLoaded, setRecommendationLoaded] =
    useState<boolean>(false);
  const [films, setFilms] = useState<any>({});
  const [userResponse, setUserResponse] = useState<any>({});
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
              question.options.map(async (option) => {
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

  const handleAnswer = async (answer: string) => {
    if (currentQuestion < questions.length - 1) {
      setUserResponse((prev: any) => ({
        ...prev,
        [questions[currentQuestion].id]: answer,
      }));
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const response = (await api.post("/api/recommendations")).data;
      navigate("/recommendation", {
        replace: true,
        state: { films: response },
      });
    }
  };

  return (
    <div className="container">
      {isLoading ? (
        <div className="loading-container">
          <Loader />
        </div>
      ) : (
        <>
          <h2 className="title">Dumbie</h2>
          {recommendationLoaded && (
            <>
              <h2 className="question">
                {questions[currentQuestion].question}
              </h2>
              <div className="options">
                {questions[currentQuestion].options.map((option, index) => (
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
                ))}
              </div>
              <div className="footer">
                Domanda {currentQuestion + 1}/{questions.length}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Questions;

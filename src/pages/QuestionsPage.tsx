import { useEffect, useState } from "react";
import api from "../api/genericApi";
import "../styles/styles.css";
import Loader from "../components/Loader";
import { GeneratedFilmType } from "../types/GeneratedFilmType";
import { UserResponseType } from "../types/UserResponseType";
import { Recommendation } from "../types/Recommendation";
import { SelectedFilm } from "../components/SelectedFilm";
import { RecommendationResponse } from "../components/RecommendationResponse";
import { RecommendationResponseType } from "../types/RecommendationResponse";
import { QuestionType } from "../types/QuestionType";
import { Questions } from "../components/Questions";

/**
 * Renders a page with a series of questions for generating movie recommendations.
 *
 * @return {JSX.Element} The rendered page with the questions and recommendations.
 */
const QuestionsPage = () => {
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
  const [recommendationResponse, setRecommendationResponse] =
    useState<RecommendationResponseType | null>(null);
  const [selectedFilm, setSelectedFilm] = useState<Recommendation | null>(null);

  /**
   * A function that constructs a public image URL based on the provided folder and image name.
   *
   * @param {string} folder - The folder where the image is stored.
   * @param {string} imageName - The name of the image file.
   * @return {string} The constructed public image URL.
   */
  const getPublicImageUrl = (folder: string, imageName: string) => {
    return process.env.REACT_APP_PUBLIC_BUCKET_URL + folder + "/" + imageName;
  };

  /**
   * Get 4 random films asynchronously from the server and update the state with the response data.
   *
   */
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

  /**
   * Fetches the image URLs for the questions.
   *
   * @return {Promise<void>} A promise that resolves when the image URLs are fetched.
   */
  useEffect(() => {
    const fetchImageUrls = async () => {
      if (recommendationLoaded) {
        const urlPromises = questions.flatMap((question) => {
          if (question.id === "moviePreference") {
            return [films.url1, films.url2, films.url3, films.url4].map(
              (url) => url || process.env.REACT_APP_URL_NOT_FOUND
            );
          } else {
            return question.options.map((option) =>
              getPublicImageUrl(question.id, option.toLowerCase() + ".png")
            );
          }
        });

        const resolvedUrls = await Promise.all(urlPromises);
        const allUrls: string[] = resolvedUrls.filter(
          (url): url is string => url !== null
        );

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

  /**
   * Updates the user response with the given answer and handles the logic for moving to the next question or making a recommendation.
   *
   * @param {string} answer - The answer provided by the user.
   * @return {void} This function does not return anything.
   */
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

  /**
   * Resets the state of the user response, selected film, current question, and recommendation response to their initial values.
   *
   * @return {void} This function does not return anything.
   */
  const handleRestart = () => {
    setUserResponse({});
    setSelectedFilm(null);
    setCurrentQuestion(0);
    setRecommendationResponse(null);
  };

  /** Questions static array. */
  const questions: QuestionType[] = [
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
      <SelectedFilm
        selectedFilm={selectedFilm}
        handleBack={handleBack}
      ></SelectedFilm>
    );
  }

  if (recommendationResponse) {
    return (
      <RecommendationResponse
        recommendationResponse={recommendationResponse}
        handleFilmClick={handleFilmClick}
        handleRestart={handleRestart}
      ></RecommendationResponse>
    );
  }

  return (
    <Questions
      isLoading={isLoading}
      recommendationLoaded={recommendationLoaded}
      questions={questions}
      currentQuestion={currentQuestion}
      setCurrentQuestion={setCurrentQuestion}
      handleAnswer={handleAnswer}
      imageUrls={imageUrls}
      handlePrevious={handlePrevious}
      handleRestart={handleRestart}
    ></Questions>
  );
};

export default QuestionsPage;

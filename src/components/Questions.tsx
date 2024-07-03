import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/styles.css";
import Loader from "./loader";
import { QuestionType } from "../types/QuestionType";

interface IProps {
  isLoading: boolean;
  recommendationLoaded: boolean;
  questions: QuestionType[];
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  handleAnswer: (answer: string) => void;
  imageUrls: string[];
  handlePrevious: () => void;
  handleRestart: () => void;
}

export const Questions: React.FC<IProps> = ({
  isLoading,
  recommendationLoaded,
  questions,
  currentQuestion,
  setCurrentQuestion,
  handleAnswer,
  imageUrls,
  handlePrevious,
  handleRestart,
}) => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

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
          {isLoggedIn ? (
            <button className="user-button" onClick={() => navigate("/user")}>
              Ciao {user?.email || "User"}
            </button>
          ) : (
            <div className="user-button" onClick={() => navigate("/login")}>
              Accedi
            </div>
          )}
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

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/styles.css";
import Loader from "./Loader";
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

/**
 * Renders a component that displays a series of questions and allows the user to answer them.
 *
 * @param {IProps} props - The props for the component.
 * @param {boolean} props.isLoading - Indicates if the component is currently loading.
 * @param {boolean} props.recommendationLoaded - Indicates if the recommendation has been loaded.
 * @param {QuestionType[]} props.questions - The list of questions to display.
 * @param {number} props.currentQuestion - The index of the current question.
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setCurrentQuestion - The function to update the current question.
 * @param {(answer: string) => void} props.handleAnswer - The function to handle the user's answer.
 * @param {string[]} props.imageUrls - The list of image URLs.
 * @param {() => void} props.handlePrevious - The function to handle the previous question.
 * @param {() => void} props.handleRestart - The function to handle restarting the questions.
 * @return {JSX.Element} The rendered component.
 */
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
                      {imageUrls[
                        questions
                          .slice(0, currentQuestion)
                          .reduce((acc, q) => acc + q.options.length, 0) + index
                      ] && (
                        <img
                          src={
                            imageUrls[
                              questions
                                .slice(0, currentQuestion)
                                .reduce((acc, q) => acc + q.options.length, 0) +
                                index
                            ]
                          }
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

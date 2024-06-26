import React, { useState } from "react";
import QuestionContainer from "../styles/QuestionContainer";
import Input from "../styles/Input";
import Label from "../styles/Label";
import Button from "../styles/Button";

interface MoodQuestionsProps {
  onSubmit: (answers: string[]) => void;
}

const MoodQuestions: React.FC<MoodQuestionsProps> = ({ onSubmit }) => {
  const [answers, setAnswers] = useState<string[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => (
        <QuestionContainer key={index}>
          <Label>Domanda {index + 1}</Label>
          <Input
            type="text"
            value={answers[index] || ""}
            onChange={(event) => handleChange(event, index)}
          />
        </QuestionContainer>
      ))}
      <Button onClick={handleSubmit}>Invia</Button>
    </div>
  );
};

export default MoodQuestions;

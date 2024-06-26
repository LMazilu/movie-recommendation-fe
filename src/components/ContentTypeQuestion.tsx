import React, { useState } from "react";
import Container from "../styles/Container";
import Label from "../styles/Label";
import RadioInput from "../styles/RadioInput";
import Button from "../styles/Button";

interface ContentTypeQuestionProps {
  onSubmit: (type: string) => void;
}

const ContentTypeQuestion: React.FC<ContentTypeQuestionProps> = ({
  onSubmit,
}) => {
  const [type, setType] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(type);
  };

  return (
    <Container>
      <Label>
        <RadioInput
          type="radio"
          value="film"
          checked={type === "film"}
          onChange={handleChange}
        />
        Film
      </Label>
      <Label>
        <RadioInput
          type="radio"
          value="serieTV"
          checked={type === "serieTV"}
          onChange={handleChange}
        />
        Serie TV
      </Label>
      <Label>
        <RadioInput
          type="radio"
          value="documentari"
          checked={type === "documentari"}
          onChange={handleChange}
        />
        Documentari
      </Label>
      <Label>
        <RadioInput
          type="radio"
          value="cartoon"
          checked={type === "cartoon"}
          onChange={handleChange}
        />
        Cartoon
      </Label>
      <Button onClick={handleSubmit}>Invia</Button>
    </Container>
  );
};

export default ContentTypeQuestion;

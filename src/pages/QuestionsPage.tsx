import React, { useState } from "react";
import axios from "axios";
import Input from "../components/base/Input";
import Button from "../components/base/Button";

const Questions: React.FC = () => {
  const [moodAnswers, setMoodAnswers] = useState<string[]>([]);
  const [contentType, setContentType] = useState("");
  const [genre, setGenre] = useState("");
  const [recommendation, setRecommendation] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3030/api/recommendations",
        { moodAnswers, contentType, genre },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecommendation(response.data);
    } catch (error) {
      console.error("Recommendation error", error);
    }
  };

  return (
    <div className="questions">
      <h1>Questions</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Mood Answers"
          value={moodAnswers.join(", ")}
          onChange={(e) => setMoodAnswers(e.target.value.split(", "))}
        />
        <Input
          type="text"
          placeholder="Content Type"
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <Button onClick={() => handleSubmit} label="Get Recommendation" />
      </form>
      {recommendation && (
        <div className="recommendation">
          <h2>Recommendation</h2>
          <p>Title: {recommendation.title}</p>
          <p>Description: {recommendation.description}</p>
          <p>Cast: {recommendation.cast}</p>
          <p>Duration: {recommendation.duration}</p>
          <p>Year: {recommendation.year}</p>
        </div>
      )}
    </div>
  );
};

export default Questions;

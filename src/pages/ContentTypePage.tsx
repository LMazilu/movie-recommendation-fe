import React from "react";
import ContentTypeQuestion from "../components/ContentTypeQuestion";
import Container from "../styles/Container";

interface ContentTypePageProps {
  onSubmit: (type: string) => void;
}

const ContentTypePage: React.FC<ContentTypePageProps> = ({ onSubmit }) => {
  return (
    <Container>
      <h2>Che tipo di contenuto vuoi guardare?</h2>
      <ContentTypeQuestion onSubmit={onSubmit} />
    </Container>
  );
};

export default ContentTypePage;

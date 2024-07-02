import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import naturaImg from "../assets/passions/natura.png";
import generazioniImg from "../assets/passions/generazioni.png";
import politicaImg from "../assets/passions/politica.png";
import viaggioImg from "../assets/passions/viaggio.png";

const Container = styled.div`
  background-color: #ffd600;
  color: #000;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

  h1 {
    font-family: "Arial", sans-serif;
    font-size: 24px;
    color: #ff4d4d;
  }

  button {
    background: none;
    border: none;
    font-size: 24px;
  }
`;

const Question = styled.h2`
  font-family: "Arial", sans-serif;
  font-size: 28px;
  text-align: center;
  margin: 20px 0;
`;

const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 400px;
`;

const Option = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    min-width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    position: absolute;
    bottom: 10px;
    left: 10px;
    font-size: 18px;
    color: #fff;
    font-weight: bold;
  }
`;

const Footer = styled.footer`
  margin-top: auto;
  font-family: "Arial", sans-serif;
  font-size: 18px;
`;

const Questions = () => {
  const navigate = useNavigate();
  //const { updateUserChoice } = useContext(UserContext);

  const handleOptionClick = (choice: string) => {
    //updateUserChoice({ passion: choice });
    // navigate("/film-choice", {
    //   replace: true,
    //   state: { page: 2, topic: choice, next: "years" },
    // });
    navigate("/years");
  };

  return (
    <Container>
      <Header>
        <h1>Dumbie</h1>
      </Header>
      <Question>Cosa ti appassiona oggi?</Question>
      <Options>
        <Option onClick={() => handleOptionClick("Natura")}>
          <img src={naturaImg} alt="Natura" />
          <span>Natura</span>
        </Option>
        <Option onClick={() => handleOptionClick("Generazioni")}>
          <img src={generazioniImg} alt="Generazioni" />
          <span>Generazioni</span>
        </Option>
        <Option onClick={() => handleOptionClick("Politica")}>
          <img src={politicaImg} alt="Politica" />
          <span>Politica</span>
        </Option>
        <Option onClick={() => handleOptionClick("Viaggio")}>
          <img src={viaggioImg} alt="Viaggio" />
          <span>Viaggio</span>
        </Option>
      </Options>
      <Footer>1/6</Footer>
    </Container>
  );
};

export default Questions;

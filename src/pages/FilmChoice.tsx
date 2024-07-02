import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import api from "../api/genericApi";
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

export const FilmChoice : React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //const films = await api.post(`/recommedations/${location.state.topic}`);
  //console.log(films);

  const handleOptionClick = (choice: string) => {
    //updateUserChoice({ passion: choice });
    // navigate("/film-choice", {
    //   replace: true,
    //   state: { page: 2, topic: choice, next: "years" },
    // });
    //navigate("/years");
  };

  return (
    <Container>
      <Header>
        <h1>Dumbie</h1>
      </Header>
      <Question>Quale tra questi film ti piace di più?</Question>
      <Options>
        <Option onClick={() => handleOptionClick("Natura")}>
          <img src="www.a.com" alt="Natura" />
          <span>Natura</span>
        </Option>
        <Option onClick={() => handleOptionClick("Generazioni")}>
          <img src="www.a.com" alt="Generazioni" />
          <span>Generazioni</span>
        </Option>
        <Option onClick={() => handleOptionClick("Politica")}>
          <img src="www.a.com" alt="Politica" />
          <span>Politica</span>
        </Option>
        <Option onClick={() => handleOptionClick("Viaggio")}>
          <img src="www.a.com" alt="Viaggio" />
          <span>Viaggio</span>
        </Option>
      </Options>
      <Footer>{location.state.page}/6</Footer>
    </Container>
  );
};

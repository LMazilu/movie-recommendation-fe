import "./styles/ThankYouPage.css";

const ThankYouPage = () =>
  //{ mood }
  {
    return (
      <div className="thankyou-container">
        <h1 className="title">Dumbie</h1>
        <div className="message">
          <p className="thanks">GRAZIE!</p>
          <p className="mood-message">Oggi sembra che tu sia</p>
          <p className="mood">{"mood"}</p>
        </div>
        <button className="discover-button">
          <span>SCOPRI IL FILM</span>
          <img src="/path/to/icon.png" alt="film icon" className="icon" />
        </button>
      </div>
    );
  };

export default ThankYouPage;

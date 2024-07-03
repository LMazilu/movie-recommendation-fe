import "./Loader.css";


/**
 * Renders a loader component with a text message and a spinner.
 *
 * @return {JSX.Element} The loader component.
 */
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-text">
        Stiamo caricando le informazioni per migliorare la tua esperienza
        <span className="loader-dots"></span>
      </div>
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;

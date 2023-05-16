import { Link } from "react-router-dom";
import "./formations.scss";

const Formations = () => {
  return (
    <div className="formations">
      <div className="cardsContainer">
        <div className="card card1">
          <h2>Pack BackEnd</h2>
          <p>
            Prix: <span>550€</span>
          </p>
          <Link to="/formation/1" className="link">
            <button>Découvrir</button>
          </Link>
          <span className="info">
            Si vous n'êtes pas connecté, vous serez renvoyé à la page de
            connexion en appuyant sur le bouton
          </span>
        </div>
        <div className="card card2">
          <h2>Pack FullStack</h2>
          <p>Meilleure vente !</p>
          <p>
            Prix: <span>1050€</span> 899.99€
          </p>
          <Link to="/formation/3" className="link">
            <button>Découvrir</button>
          </Link>
          <span className="info">
            Si vous n'êtes pas connecté, vous serez renvoyé à la page de
            connexion en appuyant sur le bouton
          </span>
        </div>
        <div className="card card3">
          <h2>Pack FrontEnd</h2>
          <p>
            Prix: <span>400€</span>
          </p>
          <Link to="/formation/2" className="link">
            <button>Découvrir</button>
          </Link>
          <span className="info">
            Si vous n'êtes pas connecté, vous serez renvoyé à la page de
            connexion en appuyant sur le bouton
          </span>
        </div>
      </div>
    </div>
  );
};

export default Formations;

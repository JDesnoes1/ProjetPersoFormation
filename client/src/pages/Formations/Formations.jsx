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
          <button>Découvrir</button>
        </div>
        <div className="card card2">
          <h2>Pack FullStack</h2>
          <p>Meilleure vente !</p>
          <p>
            Prix: <span>1050€</span> 899.99€
          </p>
          <button>Découvrir</button>
        </div>
        <div className="card card3">
          <h2>Pack FrontEnd</h2>
          <p>
            Prix: <span>400€</span>
          </p>
          <button>Découvrir</button>
        </div>
      </div>
    </div>
  );
};

export default Formations;

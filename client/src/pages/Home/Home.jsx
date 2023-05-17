import "./home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="cards">
        <div className="card card1">
          <h2>Accès à vos cours</h2>
          <div className="infos">
            <Link to="/cours">
              <button>MES COURS</button>
            </Link>
            <p>Accès rapide vers vos cours</p>
            <span>
              * Si vous n'êtes pas connecté, vous serez automatiquement envoyé
              vers la page de connexion
            </span>
          </div>
        </div>
        <div className="card card2">
          <h2>Vous souhaitez acheter une formation ?</h2>
          <div className="infos">
            <Link to="/formations">
              <button>Nos Formations</button>
            </Link>
            <p>Accès rapide vers l'achat d'une formation</p>
            <span>
              *Si vous voulez devenir un developpeur confirmé, cette page est
              faite pour vous
            </span>
          </div>
        </div>
        <div className="card card3">
          <h2>En savoir plus sur notre équipe</h2>
          <div className="infos">
            <Link to="/about">
              <button>A propos de nous</button>
            </Link>
            <p>Accès rapide vers les informations sur notre équipe</p>
            <span>
              * N'hésitez pas à faire vos retour à propos des formations sur
              notre discord ❤
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

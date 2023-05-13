import "./register.scss";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>2 modules offerts à l'inscription !</h1>
          <p>
            La programmation vous passionne ? En vous inscrivant, vous receverez
            deux modules de notre formation la plus côté sur NodeJs ! Vous aurez
            l'opportunité d'apprendre à mettre en place un projet et comprendre
            le framework Express gratuitement !
          </p>
          <span>Vous avez déjà un compte ?</span>
          <Link to="/connexion">
            <button>Retour à connexion</button>
          </Link>
        </div>
        <div className="right">
          <h3>Inscription</h3>
          <form action="">
            <input type="text" placeholder="Nom d'utilisateur" />
            <input type="email" placeholder="Email" />
            <input type="test" placeholder="Nom" />
            <input type="text" placeholder="Prénom" />
            <input type="text" placeholder="Ville" />
            <input type="password" placeholder="Mot de passe" />
            <input type="password" placeholder="Confirmation mot de passe" />
            <button>S'inscrire</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

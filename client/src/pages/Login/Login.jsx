import "./login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>L'aventure commence ici !</h1>
          <p>
            Bienvenue sur Formation Dev ! Ici, on propose beaucoup de formations
            différentes dans le developpement Web, principalement sur les
            technologies Javascript. Vous voulez devenir un developpeur
            fullstack accomplie ? Vous êtes au bon endroit.
          </p>
          <span>Vous n'avez pas de compte ?</span>
          <Link to="/register">
            <button>Créer un compte</button>
          </Link>
        </div>
        <div className="right">
          <h3>Connexion</h3>
          <form action="">
            <input type="text" placeholder="Nom d'utilisateur" />
            <input type="password" placeholder="Mot de passe" />
            <button>Se connecter</button>
          </form>
          <Link to="/" className="link">
            <span>Retour à la page principale</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

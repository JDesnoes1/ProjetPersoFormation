import "./login.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { AchatContext } from "../../context/achatContext";

const Login = () => {
  //Envoyer le message quand l'inscription réussie !
  const location = useLocation();
  const { getAllAchats } = useContext(AchatContext);

  const { successMessage } = location.state || {};

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
      await getAllAchats();
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>L'aventure commence ici !</h1>
          <p>
            Bienvenue sur Formation Dev ! Ici, on propose 3 formations
            différentes dans le developpement Web, principalement sur les
            technologies Javascript. Vous voulez devenir un developpeur
            fullstack ? Vous êtes au bon endroit.
          </p>
          <span>Vous n'avez pas de compte ?</span>
          <Link to="/register">
            <button>Créer un compte</button>
          </Link>
        </div>
        <div className="right">
          <h3>Connexion</h3>
          {successMessage && <p>{successMessage}</p>}
          <form action="">
            <input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleLogin}>Se connecter</button>
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

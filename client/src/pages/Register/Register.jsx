import "./register.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    nom: "",
    prenom: "",
    ville: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = async (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (inputs.password === confirmPassword) {
        await makeRequest.post("auth/register", inputs);
        navigate("/connexion", {
          state: {
            successMessage:
              "Inscription réussie, veuillez vous connecter pour acceder à toutes les les fonctionnalités du site !",
          },
        });
      } else {
        setErr("Les mots de passe ne correspondent pas");
      }
    } catch (err) {
      setErr(err.response.data);
    }
  };

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
            <input
              required
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              onChange={handleChange}
              minLength="2"
              maxLength="20"
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              minLength="5"
            />
            <input
              required
              type="text"
              name="nom"
              placeholder="Nom"
              onChange={handleChange}
              minLength="2"
              maxLength="20"
            />
            <input
              required
              type="text"
              name="prenom"
              placeholder="Prénom"
              onChange={handleChange}
              minLength="2"
              maxLength="20"
            />
            <input
              required
              type="text"
              name="ville"
              placeholder="Ville"
              onChange={handleChange}
              minLength="2"
              maxLength="50"
            />
            <input
              required
              type="password"
              name="password"
              placeholder="Mot de passe"
              onChange={handleChange}
              pattern="(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?\\[#?!@$%^&*-]).{8,}"
            />
            <input
              type="password"
              name="mdp2"
              placeholder="Confirmation mot de passe"
              value={confirmPassword}
              onChange={handleConfirmPassword}
            />
            <p className="erreur">{err && err}</p>
            <button onClick={handleClick}>S'inscrire</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

import "./login.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h3>Salut à tous !</h3>
          <p>
            Bienvenue sur Formation Dev ! Ici, on propose beaucoup de formations
            différentes dans le developpement Web, principalement sur les
            technologies Javascript
          </p>
          <span>Vous n'avez pas de compte ?</span>
          <button>Créer un compte</button>
        </div>
        <div className="right">
          <h3>Connexion</h3>
        </div>
      </div>
    </div>
  );
};

export default Login;

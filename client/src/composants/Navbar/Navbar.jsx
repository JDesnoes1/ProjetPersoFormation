import "./navbar.scss";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav>
      <div className="left">
        <div className="logo">
          <LogoDevIcon />
        </div>
        <Link to="/" className="link">
          <h3>Formations Dev</h3>
        </Link>
      </div>
      <div className="right">
        {currentUser ? (
          <p className="deco" onClick={handleLogout}>
            Deconnexion
          </p>
        ) : (
          <Link to="/connexion" className="link">
            <p>Connexion</p>
          </Link>
        )}
        <Link to="/formations" className="link">
          <p>Nos formations</p>
        </Link>
        <Link to="/about" className="link">
          <p>A propos de nous</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

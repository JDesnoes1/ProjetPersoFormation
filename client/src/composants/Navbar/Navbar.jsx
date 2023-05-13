import "./navbar.scss";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import { Link } from "react-router-dom";

const Navbar = () => {
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
        <Link to="/connexion" className="link">
          <p>Connexion</p>
        </Link>
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

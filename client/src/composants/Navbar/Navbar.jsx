import "./navbar.scss";
import LogoDevIcon from "@mui/icons-material/LogoDev";

const Navbar = () => {
  return (
    <nav>
      <div className="left">
        <div className="logo">
          <LogoDevIcon />
        </div>
        <h3>Formations Dev</h3>
      </div>
      <div className="right">
        <p>Inscription</p>
        <p>Nos formations</p>
        <p>A propos de nous</p>
      </div>
    </nav>
  );
};

export default Navbar;

import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import "./cours.scss";
import { Link } from "react-router-dom";

const Cours = () => {
  const [mesFormations, setMesFormations] = useState(false);

  useEffect(() => {
    const getAllAchats = async () => {
      try {
        const response = await makeRequest.get("achat/allAchats");
        setMesFormations(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(
          "Une erreur s'est produite lors de la récupération des formations achetées :",
          err
        );
      }
    };
    getAllAchats();
  }, []);

  return (
    <div className="cours">
      <div className="card">
        <div className="infos">
          <h1>Mes formations :</h1>
          {mesFormations.length >= 1 ? (
            <h2>Vous possédez {mesFormations.length} formation(s)</h2>
          ) : (
            <h2>Accès limité aux modules offerts</h2>
          )}
        </div>
        <div className="mesFormations">
          {mesFormations.length >= 1 ? (
            mesFormations.map((maFormation) => (
              <div className="formationCards">
                <p>Formation {maFormation.nom}</p>
                <Link>
                  <button>Accès formation {maFormation.nom}</button>
                </Link>
              </div>
            ))
          ) : (
            <div className="formationCards">
              <p>Accès limité module FullStack</p>
              <Link>
                <button>Accès non premium FullStack</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cours;

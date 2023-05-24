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
      } catch (err) {
        console.error(
          "Une erreur s'est produite lors de la récupération des formations achetées :",
          err
        );
      }
    };
    getAllAchats();
  }, []);

  const formationIds =
    mesFormations &&
    mesFormations.map((maFormation) => maFormation.id_formation);
  const hasFullStack = formationIds && formationIds.includes(3);

  return (
    <div className="cours">
      <div className="card">
        <div className="infos">
          <h1>Mes formations :</h1>
          {mesFormations.length >= 1 ? (
            hasFullStack ? (
              <h2>Vous possédez {mesFormations.length} formation(s)</h2>
            ) : (
              <>
                <h2>Vous possédez {mesFormations.length} formation(s)</h2>
              </>
            )
          ) : (
            <h2>Accès limité aux 2 modules offerts</h2>
          )}
        </div>
        <div className="mesFormations">
          {mesFormations.length >= 1 ? (
            hasFullStack ? (
              mesFormations.map((maFormation) => (
                <div className="formationCards" key={maFormation.id}>
                  <p>Formation {maFormation.nom}</p>
                  <Link to={`/cours/${maFormation.id_formation}`}>
                    <button>Accès formation {maFormation.nom}</button>
                  </Link>
                </div>
              ))
            ) : (
              <>
                {mesFormations.map((maFormation) => (
                  <div className="formationCards" key={maFormation.id}>
                    <p>Formation {maFormation.nom}</p>
                    <Link to={`/cours/${maFormation.id_formation}`}>
                      <button>Accès formation {maFormation.nom}</button>
                    </Link>
                  </div>
                ))}
                <div className="formationCards">
                  <p>Accès limité module FullStack</p>
                  <Link>
                    <button>Accès non premium FullStack</button>
                  </Link>
                </div>
              </>
            )
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

import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import "./cours.scss";

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
    <div>
      <h1>Mes formations :</h1>
      <h2>Vous possedez {mesFormations.length} formations</h2>
      <div>
        {mesFormations &&
          mesFormations.map(
            (maFormation) => `Je possède la formation ${maFormation.nom}`
          )}
      </div>
    </div>
  );
};

export default Cours;

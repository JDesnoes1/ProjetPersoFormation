import "./detailsFormation.scss";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";

const DetailsFormations = ({ formationId }) => {
  const [formation, setFormation] = useState(null);

  useEffect(() => {
    const getFormation = async () => {
      const response = await makeRequest.get(`formation/find/${formationId}`);
      if (response && response.data) {
        setFormation(response.data);
      }
    };
    getFormation();
  }, [formationId]);

  if (!formation) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Formation {formation.nom}</h1>
    </div>
  );
};

export default DetailsFormations;

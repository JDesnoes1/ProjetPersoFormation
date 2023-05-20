import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import "./linkPagesFormation.scss";

const LinkPagesFormation = (idFormation) => {
  const [formation, setFormation] = useState(null);

  idFormation = parseInt(useLocation().pathname.split("/")[2]);

  useEffect(() => {
    const getFormation = async () => {
      const response = await makeRequest.get(`formation/find/${idFormation}`);
      if (response && response.data) {
        setFormation(response.data);
      }
    };
    getFormation();
  }, [idFormation]);

  if (!formation) {
    return <div>Loading...</div>;
  }

  return <div>{formation.nom}</div>;
};

export default LinkPagesFormation;

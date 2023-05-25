import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import "./linkPagesFormation.scss";

const LinkPagesFormation = (idFormation) => {
  const [formation, setFormation] = useState(null);
  const [modules, setModules] = useState([]);

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

  useEffect(() => {
    const getModules = async () => {
      const response = await makeRequest.get(`module/${idFormation}`);
      if (response && response.data) {
        setModules(response.data);
      }
    };
    getModules();
  }, [idFormation]);

  if (!formation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="leftbar">
      <div className="titre">
        <h2>Formation {formation.nom}</h2>
      </div>
      <div className="liens">
        {modules.map((module) => (
          <a key={module.id} href="">
            {module.nom}
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinkPagesFormation;

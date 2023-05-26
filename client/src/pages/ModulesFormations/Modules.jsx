import "./modules.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import LinkPagesFormation from "../../composants/LinkPagesFormation/LinkPagesFormation";
import { useEffect } from "react";
import { makeRequest } from "../../axios";

const Modules = () => {
  const location = useLocation();
  const [module, setModule] = useState([]);
  const [moduleId, setModuleId] = useState(null);

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const idModule = parseInt(pathParts[pathParts.length - 1]);
    setModuleId(idModule);
  }, [location]);

  useEffect(() => {
    const getModuleById = async () => {
      if (moduleId) {
        const response = await makeRequest.get(`module/mod/${moduleId}`);
        if (response && response.data) {
          setModule(response.data);
        }
      }
    };
    getModuleById();
  }, [moduleId]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <LinkPagesFormation />
        </div>
        <div className="container">
          <div className="content">
            {module && module.length > 0 ? (
              <>
                <h1>{module[0].titre}</h1>
                <p>{module[0].contenu}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modules;

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
  const [selectedOption, setSelectedOption] = useState("");
  const [inputs, setInputs] = useState({
    contenu: "",
    ordre: Number(""),
  });

  const handleChange = async (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(inputs);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (moduleId) {
      await makeRequest.post(`paragraphe/${moduleId}`, inputs);
    }
  };

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
            <div style={{ display: "flex" }}>
              <p>Ajouter un contenu</p>
              <select value={selectedOption} onChange={handleOptionChange}>
                <option value="sous-titre">Sous-titre</option>
                <option value="paragraphe">Paragraphe</option>
              </select>
            </div>
            {selectedOption === "sous-titre" ? (
              <form>
                <input type="text" name="sousTitreContent" />
                <button onClick={handleSubmit}>Ajouter un sous-titre</button>
              </form>
            ) : (
              <form>
                <textarea
                  name="contenu"
                  placeholder="Votre paragraphe ici"
                  onChange={handleChange}
                ></textarea>
                <input type="number" name="ordre" onChange={handleChange} />
                <button onClick={handleSubmit}>Ajouter un paragraphe</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modules;

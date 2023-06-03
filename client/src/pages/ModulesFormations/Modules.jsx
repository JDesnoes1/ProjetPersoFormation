import "./modules.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import LinkPagesFormation from "../../composants/LinkPagesFormation/LinkPagesFormation";
import { useEffect } from "react";
import { makeRequest } from "../../axios";

const Modules = () => {
  const location = useLocation();
  const [module, setModule] = useState([]);
  const [paragraphes, setParagraphes] = useState([]);
  const [st, setSt] = useState([]);
  const [moduleId, setModuleId] = useState(null);
  const [selectedOption, setSelectedOption] = useState("paragraphe");
  const [inputs, setInputs] = useState({
    contenu: "",
    ordre: Number(""),
  });

  //Methode qui permet de récupérer les différents éléments que l'admin mettra dans le formulaire, permet d'ajouter les éléments en base de données
  const handleChange = async (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Permet de récupérer l'option de l'admin (Si il souhaite ajouter un sous-titre, paragraphe, etc...)
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  //Permet de d'aller récupérer l'id Module dans l'URL
  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const idModule = parseInt(pathParts[pathParts.length - 1]);
    setModuleId(idModule);
  }, [location]);

  //Permet de récupérer un module par apport à son ID pour récupérer les informations d'un module.
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

  useEffect(() => {
    const getParagraphesByModId = async () => {
      if (moduleId) {
        const response = await makeRequest.get(`paragraphe/${moduleId}`);
        if (response && response.data) {
          setParagraphes(response.data);
        }
      }
    };
    getParagraphesByModId();
  }, [moduleId]);

  useEffect(() => {
    const getStByModId = async () => {
      if (moduleId) {
        const response = await makeRequest.get(`sousTitre/${moduleId}`);
        if (response && response.data) {
          setSt(response.data);
        }
      }
    };
    getStByModId();
  }, [moduleId]);

  //Permet d'ajouter un (***paragraphe***) quand l'admin va appuyer sur le bouton
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (moduleId) {
      if (selectedOption === "paragraphe") {
        await makeRequest.post(`paragraphe/${moduleId}`, inputs);
      }
      if (selectedOption === "sous-titre") {
        await makeRequest.post(`sousTitre/${moduleId}`, inputs);
      }
    }
  };

  const combinedData = [
    ...paragraphes.map((paragraphe) => ({ ...paragraphe, type: "paragraphe" })),
    ...st.map((sousTitre) => ({ ...sousTitre, type: "sous-titre" })),
  ];
  combinedData.sort((a, b) => a.ordre - b.ordre);

  useEffect(() => {
    const defaultOrder = combinedData.length + 1;
    setInputs((prevInputs) => ({
      ...prevInputs,
      ordre: defaultOrder,
    }));
  }, [combinedData.length]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <LinkPagesFormation />
        </div>
        <div className="container">
          <div className="content">
            <h1>{module && module[0]?.titre}</h1>
            {combinedData && combinedData.length > 0 ? (
              <>
                {combinedData.map((item) => (
                  <div key={item.id}>
                    {item.type === "paragraphe" && (
                      <p>
                        {item.contenu} <button>Modifier</button>
                      </p>
                    )}
                    {item.type === "sous-titre" && (
                      <h3>
                        {item.contenu} <button>Modifier</button>
                      </h3>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <p>Loading...</p>
            )}
            <div style={{ display: "flex" }}>
              <p>Ajouter un contenu</p>
              <select value={selectedOption} onChange={handleOptionChange}>
                <option value="paragraphe">Paragraphe</option>
                <option value="sous-titre">Sous-titre</option>
              </select>
            </div>
            {selectedOption === "sous-titre" ? (
              <form>
                <input
                  type="text"
                  name="contenu"
                  onChange={handleChange}
                  placeholder="Votre sous-titre"
                />
                <input
                  type="number"
                  name="ordre"
                  onChange={handleChange}
                  placeholder="Ordre"
                  value={combinedData.length + 1}
                />
                <button onClick={handleSubmit}>Ajouter un sous-titre</button>
              </form>
            ) : (
              <form>
                <textarea
                  name="contenu"
                  placeholder="Votre paragraphe ici"
                  onChange={handleChange}
                ></textarea>
                <input
                  type="number"
                  name="ordre"
                  onChange={handleChange}
                  placeholder="Ordre"
                  value={combinedData.length + 1}
                />
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

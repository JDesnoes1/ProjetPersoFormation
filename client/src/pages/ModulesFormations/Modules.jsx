import "./modules.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import LinkPagesFormation from "../../composants/LinkPagesFormation/LinkPagesFormation";
import { useEffect } from "react";
import { makeRequest } from "../../axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

const Modules = () => {
  const location = useLocation();
  const [module, setModule] = useState([]);
  const [moduleId, setModuleId] = useState(null);
  const [selectedOption, setSelectedOption] = useState("paragraphe");
  const [inputs, setInputs] = useState({
    contenu: "",
    ordre: Number(""),
  });

  const queryClient = useQueryClient();

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

  const addContenuMutation = useMutation(async (newContenu) => {
    if (selectedOption === "paragraphe") {
      await makeRequest.post(`paragraphe/${moduleId}`, newContenu);
    }
    if (selectedOption === "sous-titre") {
      await makeRequest.post(`sousTitre/${moduleId}`, newContenu);
    }
    queryClient.invalidateQueries(["paragraphes", moduleId]);
    queryClient.invalidateQueries(["sousTitres", moduleId]);
  });

  const { data: paragraphes, isLoading: isLoadingParagraphes } = useQuery(
    ["paragraphes", moduleId],
    async () => {
      const response = await makeRequest.get(`paragraphe/${moduleId}`);
      return response.data;
    }
  );

  const { data: sousTitres, isLoading: isLoadingSousTitres } = useQuery(
    ["sousTitres", moduleId],
    async () => {
      const response = await makeRequest.get(`sousTitre/${moduleId}`);
      return response.data;
    }
  );

  const combinedData = [
    ...(paragraphes || []).map((paragraphe) => ({
      ...paragraphe,
      type: "paragraphe",
    })),
    ...(sousTitres || []).map((sousTitre) => ({
      ...sousTitre,
      type: "sous-titre",
    })),
  ];
  combinedData.sort((a, b) => a.ordre - b.ordre);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (moduleId) {
      await addContenuMutation.mutateAsync(inputs);
      setInputs({
        contenu: "",
        ordre: combinedData.length + 1,
      });
    }
  };

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
                  value={inputs.contenu}
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
                  value={inputs.contenu}
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

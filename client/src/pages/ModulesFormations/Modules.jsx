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
  const [selectedContenuId, setSelectedContenuId] = useState(null);
  const [inputs, setInputs] = useState({
    contenu: "",
    ordre: Number(),
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

  const addContenuMutation = useMutation(async (newContenu) => {
    const dernierContenu = combinedData[combinedData.length - 1];
    const dernierOrdre = dernierContenu ? dernierContenu.ordre : 0;
    const nouvelOrdre = dernierOrdre + 1;

    newContenu.ordre = nouvelOrdre;

    if (selectedOption === "paragraphe") {
      await makeRequest.post(`paragraphe/${moduleId}`, newContenu);
    }
    if (selectedOption === "sous-titre") {
      await makeRequest.post(`sousTitre/${moduleId}`, newContenu);
    }
    queryClient.invalidateQueries(["paragraphes", moduleId]);
    queryClient.invalidateQueries(["sousTitres", moduleId]);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (moduleId) {
      await addContenuMutation.mutateAsync(inputs);
      setInputs({
        contenu: "",
      });
    }
  };

  const annulModif = () => {
    setSelectedContenuId(null);
    setInputs({
      contenu: "",
    });
  };

  const updateContenuMutation = useMutation(async (updatedContenu) => {
    updatedContenu.id = selectedContenuId;
    updatedContenu.ordre = inputs.ordre;
    updatedContenu.contenu = inputs.contenu;

    if (selectedOption === "paragraphe" && selectedContenuId !== null) {
      await makeRequest.put("paragraphe", updatedContenu);
    }
    if (selectedOption === "sous-titre" && selectedContenuId !== null) {
      await makeRequest.put("sousTitre", updatedContenu);
    }
    queryClient.invalidateQueries(["paragraphes"]);
    queryClient.invalidateQueries(["sousTitres"]);
  });

  const handleEdit = async (contenuId, contenu, ordre, type) => {
    setSelectedContenuId(contenuId);
    setSelectedOption(type);
    // Réinitialisez les champs du formulaire avec les données sélectionnées
    setInputs({
      contenu: contenu,
      ordre: ordre,
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await updateContenuMutation.mutateAsync(inputs);
    setSelectedContenuId(null);
    setInputs({
      contenu: "",
    });
  };

  const deleteContenuMutation = useMutation(async ({ id, type }) => {
    if (type === "paragraphe") {
      await makeRequest.delete(`paragraphe?id=${id}`);
    }
    if (type === "sous-titre") {
      await makeRequest.delete(`sousTitre?id=${id}`);
    }
    queryClient.invalidateQueries(["paragraphes"]);
    queryClient.invalidateQueries(["sousTitres"]);
  });

  const handleDelete = async (contenuId, type) => {
    await deleteContenuMutation.mutateAsync({ id: contenuId, type });
  };

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
                  <div key={`${item.id}-${item.type}`}>
                    {item.type === "paragraphe" && (
                      <p>
                        {item.contenu}
                        <button
                          onClick={() =>
                            handleEdit(
                              item.id,
                              item.contenu,
                              item.ordre,
                              item.type
                            )
                          }
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.type)}
                        >
                          Supprimer
                        </button>
                      </p>
                    )}
                    {item.type === "sous-titre" && (
                      <h3>
                        {item.contenu}
                        <button
                          onClick={() =>
                            handleEdit(
                              item.id,
                              item.contenu,
                              item.ordre,
                              item.type
                            )
                          }
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.type)}
                        >
                          Supprimer
                        </button>
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
                {selectedContenuId && (
                  <input
                    type="number"
                    name="ordre"
                    onChange={handleChange}
                    placeholder="Ordre"
                    value={inputs.ordre}
                  />
                )}
                {selectedContenuId ? (
                  <>
                    <button onClick={handleSubmitEdit}>
                      Valider sous-titre
                    </button>
                    <button onClick={annulModif}>Annuler Modif</button>
                  </>
                ) : (
                  <button onClick={handleSubmit}>Ajouter un sous-titre</button>
                )}
              </form>
            ) : (
              <form>
                <textarea
                  name="contenu"
                  placeholder="Votre paragraphe ici"
                  onChange={handleChange}
                  value={inputs.contenu}
                ></textarea>
                {selectedContenuId && (
                  <input
                    type="number"
                    name="ordre"
                    onChange={handleChange}
                    placeholder="Ordre"
                    value={inputs.ordre}
                  />
                )}
                {selectedContenuId ? (
                  <>
                    <button onClick={handleSubmitEdit}>
                      Valider paragraphe
                    </button>
                    <button onClick={annulModif}>Annuler</button>
                  </>
                ) : (
                  <button onClick={handleSubmit}>Ajouter un paragraphe</button>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modules;

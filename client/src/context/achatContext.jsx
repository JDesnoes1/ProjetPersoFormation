import { useState, createContext, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { makeRequest } from "../axios";

export const AchatContext = createContext();

export const AchatContextProvider = ({ children }) => {
  const [achats, setAchats] = useState([]);

  useEffect(() => {
    localStorage.setItem("achats", JSON.stringify(achats));
  }, [achats]);

  useEffect(() => {
    const getAllAchats = async () => {
      try {
        const response = await makeRequest.get("achat/allAchats");
        setAchats(response.data);
      } catch (err) {
        console.error(
          "Une erreur s'est produite lors de la récupération des formations achetées :",
          err
        );
      }
    };
    getAllAchats();
  }, []);

  const achatFormation = async (formationId) => {
    try {
      await makeRequest.post("achat", { formationId });
      setAchats([...achats, formationId]);
      console.log("Formation achtée avec succès !");
    } catch (err) {
      console.error(
        "Une erreur s'est produite lors de l'achat de la formation :",
        err
      );
    }
  };

  const hasPurchasedFormation = (formationId) => {
    return achats && achats.includes(formationId);
  };

  return (
    <AchatContext.Provider value={{ achatFormation, hasPurchasedFormation }}>
      {children}
    </AchatContext.Provider>
  );
};

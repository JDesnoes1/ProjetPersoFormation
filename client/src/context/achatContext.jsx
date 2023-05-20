import { useState, createContext, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { makeRequest } from "../axios";
import { AuthContext } from "./authContext";
import { useContext } from "react";

export const AchatContext = createContext();

export const AchatContextProvider = ({ children }) => {
  const [achats, setAchats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [hasPurchased, setHasPurchased] = useState(false);

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

  const getAchats = async (formationId) => {
    try {
      const response = await makeRequest.get(
        `achat?id_formation=${formationId}`
      );
      const userIds = response.data.userIds;
      const userId = currentUser.id;

      const hadPurchased = userIds.includes(userId);
      setHasPurchased(hadPurchased);
    } catch {
      console.error(
        "Une erreur s'est produite lors de la récupération des achats :",
        err
      );
    }
  };

  return (
    <AchatContext.Provider value={{ achatFormation, getAchats, hasPurchased }}>
      {children}
    </AchatContext.Provider>
  );
};

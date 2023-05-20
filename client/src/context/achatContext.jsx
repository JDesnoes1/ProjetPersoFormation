import { useState, createContext, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { makeRequest } from "../axios";
import { AuthContext } from "./authContext";
import { useContext } from "react";

export const AchatContext = createContext();

export const AchatContextProvider = ({ children }) => {
  const [achats, setAchats] = useState(
    JSON.parse(secureLocalStorage.getItem("achats") || null)
  );

  const hasFormation = (formationId) => {
    const userFormation = achats.map((achat) => achat.id_formation);
    return userFormation.includes(formationId);
  };

  console.log(hasFormation(1));

  const { currentUser } = useContext(AuthContext);
  const [hasPurchased, setHasPurchased] = useState(false);

  useEffect(() => {
    secureLocalStorage.setItem("achats", JSON.stringify(achats));
  }, [achats]);

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

  const achatFormation = async (formationId) => {
    try {
      await makeRequest.post("achat", { formationId });
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
    <AchatContext.Provider
      value={{
        achatFormation,
        getAchats,
        hasPurchased,
        achats,
        getAllAchats,
        hasFormation,
      }}
    >
      {children}
    </AchatContext.Provider>
  );
};

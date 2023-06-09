import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { makeRequest } from "../axios";
import secureLocalStorage from "react-secure-storage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(secureLocalStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await makeRequest.post("auth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
  };

  const logout = async () => {
    await makeRequest.post(
      "auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    setCurrentUser(null);
    secureLocalStorage.removeItem("user");
  };

  useEffect(() => {
    secureLocalStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

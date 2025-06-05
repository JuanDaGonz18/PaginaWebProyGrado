import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // datos usuario si está loggeado
  const [anonimo, setAnonimo] = useState(false); // true si quiere entrar anónimo

  const login = (userData) => {
    setUser(userData);
    setAnonimo(false);
  };

  const entrarAnonimo = () => {
    setUser(null);
    setAnonimo(true);
  };

  const logout = () => {
    setUser(null);
    setAnonimo(false);
  };

  return (
    <UserContext.Provider value={{ user, anonimo, login, entrarAnonimo, logout }}>
      {children}
    </UserContext.Provider>
  );
};

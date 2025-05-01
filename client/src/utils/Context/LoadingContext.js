import React, { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => {
    setLoading((prevLoading) => !prevLoading);
  };

  return (
    <LoadingContext.Provider value={{ loading, toggleLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);

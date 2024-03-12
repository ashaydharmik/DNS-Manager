import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [showRegister, setShowRegister] = useState(true);
  

  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("user")) || { token: null };
  const userToken = auth.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userToken}`,
  };



  const showLoginForm = () => {
    setShowRegister(false);
  };

 

  return (
    <AppContext.Provider
      value={{
        navigate,
        showLoginForm,
        showRegister,
        setShowRegister,
      }}
    >
      {children}

      <ToastContainer position="top-right" autoClose={2000} />
    </AppContext.Provider>
  );
};

const useGlobal = () => {
  return useContext(AppContext);
};
export { AppContext, useGlobal, AppProvider };

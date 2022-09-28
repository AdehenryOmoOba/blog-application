import React, { createContext, useState, useContext } from "react";

const usersContext = createContext(null);

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [roles, setRoles] = useState([]);
  const [toastNotofication, setToastNotofication] = useState(false);
  

  console.log(auth);

  const logout = () => {
    setAuth(null);
  };

  return (
    <usersContext.Provider
      value={{ auth,setAuth, logout, roles, setRoles,toastNotofication, setToastNotofication }}
    >
      {children}
    </usersContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(usersContext);
};

export default AuthProvider;

import React, { createContext, useState, useEffect } from "react";

import * as api from "../api";

const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem("@App:user");
    const storagedToken = sessionStorage.getItem("@App:token");

    if (storagedToken && storagedUser) {
      setCurrentUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `${storagedToken}`;
    }
  }, []);

  const login = async ({ email, password }) => {
    const { user, token } = await api.post("signin", {
      email: email,
      password: password,
    });

    setCurrentUser(user);
    api.defaults.headers.Authorization = `${token}`;

    sessionStorage.setItem("@App:user", JSON.stringify(user));
    sessionStorage.setItem("@App:token", token);
  };

  const logout = () => {
    setCurrentUser(null);
    api.defaults.headers.Authorization = "";
    sessionStorage.removeItem("@App:user");
    sessionStorage.removeItem("@App:token");
  };

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(currentUser), currentUser, login, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

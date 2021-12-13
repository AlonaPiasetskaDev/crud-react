import React, { useState, createContext, useEffect, useMemo } from "react";
import jwtDecode from "jwt-decode";
import api from "../apiClient";

const AppClient = createContext({
  handleLogin: () => {},
});

const AppContextProvider = (props) => {
  const [authUser, setAuthUser] = useState({ name: "Guest" });
  const [token, setToken] = useState();

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      setToken(window.localStorage.getItem("token"));
    }

    if (token) {
      const user = jwtDecode(window.localStorage.getItem("token"));
      setAuthUser(user);
    }
  }, [token]);

  const handleLogin = async (email, password) => {
    const data = await api.login(email, password);
    const user = jwtDecode(data.token);

    setAuthUser(user);
    setToken(data.token);

    return data.token;
  };

  const defaultState = useMemo(() => {
    return {
      authUser: authUser,
      handleLogin,
    };
  }, [authUser, token]);

  console.log(authUser);
  return (
    <AppContext.Provider value={defaultState}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };

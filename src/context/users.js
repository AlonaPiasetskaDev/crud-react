import React, { createContext } from "react";

import * as api from "../api/api";

const UsersContext = createContext({});

export const UsersProvider = (props) => {
  const fetchUsers = async (userId) => {
    return await api.get(`users`);
  };

  const updateUser = async (userId, data) => {
    console.log(
      `user context updateUser userId=${userId} data=${JSON.stringify(data)}`
    );
    // return await api.put(`users/${userId}`, data)
  };

  const deleteUser = async (userId) => {
    console.log(`user context deleteUser userId=${userId}`);
    // return await api.delete(`users/${userId}`)
  };

  return (
    <UsersContext.Provider value={{ fetchUsers, updateUser, deleteUser }}>
      {props.children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => React.useContext(UsersContext);

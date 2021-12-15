import React, { createContext, useState, useEffect } from "react";

import * as api from "../api/api";
import { useAuth } from "./auth";

const ProfilesContext = createContext({});

export const ProfilesProvider = (props) => {
  const { currentUser } = useAuth();
  console.log("ProfilesProvider", currentUser);
  // stores authorized user profiles
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    currentUser &&
      api
        .get(`users/${currentUser.id}/profiles`)
        .then((data) => setProfiles(data));
  }, [currentUser]);

  console.log("profiles", profiles);

  const fetchProfiles = async (userId) => {
    return await api.get(`users/${userId}/profiles`);
  };

  return (
    <ProfilesContext.Provider value={{ profiles, fetchProfiles }}>
      {props.children}
    </ProfilesContext.Provider>
  );
};

export const useProfilesContext = () => React.useContext(ProfilesContext);

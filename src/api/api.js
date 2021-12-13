// fetch(url, {
//   credentials: "same-origin"
// }).then(...).catch(...);

// POST api with credentials: 'include'

import { useState, useEffect } from "react";
import { Fragment } from "react-bootstrap";
import { WithLoading } from "./WithLoading";

const GetUsers = () => {
  // const UsersLoading = WithLoading(Users);
  const [appState, setAppState] = useState({
    loading: false,
    users: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const baseURL = "localhost:3000/users";
    fetch(baseURL)
      .then((res) => res.json())
      .then((users) => {
        setAppState({ loading: false, users: users });
      });
  }, [setAppState]);
  return <Fragment></Fragment>;
};

const GetUser = (id) => {
  // const UsersLoading = WithLoading(User);
  const [userState, setUserState] = useState({
    loading: false,
    user: null,
  });

  useEffect(
    (id) => {
      setUserState({ loading: true });
      const baseURL = `localhost:3000/users/${id}`;
      fetch(baseURL)
        .then((res) => res.json())
        .then((user) => {
          setUserState({ loading: false, user: user });
        });
    },
    [setUserState]
  );
  return <Fragment></Fragment>;
};


export { GetUsers, GetUser };


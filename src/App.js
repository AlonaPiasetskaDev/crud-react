/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import React from "react";
import Authorization from "./components/Auth";
import Users from "./components/Users";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import Profiles from "./components/Profiles";
import { useAuth } from "./context/auth";

import { ProfilesProvider } from "./context/profiles";
import { UsersProvider } from "./context/users";

import { Routes, Route, useNavigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { signed } = useAuth();
  return signed ? children : <Authorization />;
};

const Home = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return <>{currentUser.isAdmin ? <Dashboard /> : <Profiles />}</>;
};

const App = () => {
  const { currentUser, logout } = useAuth();
  let navigate = useNavigate();

  return (
    <div className="App">
      <UsersProvider>
        {currentUser && <NavBar />}
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          ></Route>
          <Route path="profiles" element={<Profiles />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route
            path="logout"
            element={
              <RequireAuth>
                <a href="/" onClick={(e) => logout()}>
                  Logout
                </a>
              </RequireAuth>
            }
          />
        </Routes>
      </UsersProvider>
    </div>
  );
};

export default App;

import "./App.css";
import React from "react";
import Home from "./components/Home";
import { AuthProvider } from "./context/auth";
import { ProfilesProvider } from "./context/profiles";

const App = (props) => {
  return (
    <div className="App">
      <AuthProvider>
        <ProfilesProvider>
          <Home />
        </ProfilesProvider>
      </AuthProvider>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import Home from "./pages/Home";
import { notes } from "./notes";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("loginToken"));

  return (
    <Routes>
      <Route
        path=""
        exact
        element={
          user ? (
            <Home notes={notes} user={user} setUser={setUser} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/login"
        exact
        element={
          user ? (
            <Navigate to="/" />
          ) : (
            <LoginPage user={user} setUser={setUser} />
          )
        }
      />

      <Route
        path="/register"
        exact
        element={
          user ? (
            <Navigate to="/" />
          ) : (
            <RegisterPage user={user} setUser={setUser} />
          )
        }
      />
    </Routes>
  );
};

export default App;

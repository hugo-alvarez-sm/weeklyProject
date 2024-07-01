"use client";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SignIn from "./components/LogIn/SignIn/SignIn"; // Asegúrate de que la ruta del archivo sea correcta
import SignUp from "./components/LogIn/SignUp/SignUp";

class App extends React.Component {
  render() {
    return (
      <GoogleOAuthProvider clientId="1016611963099-m1u6henjgeml93h5912fpfvu6a073leg.apps.googleusercontent.com">
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    );
  }
}

export default App;

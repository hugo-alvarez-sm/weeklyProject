// src/components/Home/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase"; // Asegúrate de que auth esté exportado correctamente desde tu firebase.js

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Llamada para cerrar sesión en Firebase
      navigate("/"); // Redirige a la página de inicio (sign-in)
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Error al cerrar sesión.");
    }
  };

  return (
    <div className="home-container">
      <h1>Bienvenido a la página principal</h1>
      <button onClick={handleLogout} className="button">
        Cerrar sesión
      </button>
    </div>
  );
};

export default Home;

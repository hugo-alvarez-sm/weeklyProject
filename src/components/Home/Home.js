// src/components/Home/Home.js

// Importamos las dependencias necesarias.
import React from "react";
import { useNavigate } from "react-router-dom"; // Hook de React Router para la navegación programada.
import { signOut } from "firebase/auth"; // Función de Firebase para cerrar sesión.
import { auth } from "../../services/firebase"; // Servicio de Firebase configurado.

// Componente funcional Home.
/**
 * Representa la página principal de la aplicación, mostrando un mensaje de bienvenida
 * y un botón para cerrar sesión.
 */
const Home = () => {
  // Hook para realizar navegación programada.
  const navigate = useNavigate();

  /**
   * Maneja el cierre de sesión del usuario.
   * Utiliza Firebase Authentication para cerrar la sesión y redirige al usuario
   * a la página de inicio de sesión.
   */
  const handleLogout = async () => {
    try {
      // Cierra la sesión del usuario utilizando Firebase Authentication.
      await signOut(auth);
      // Redirige al usuario a la página de inicio de sesión tras cerrar sesión.
      navigate("/"); 
    } catch (error) {
      // Captura y muestra un mensaje de error si la desconexión falla.
      console.error("Error al cerrar sesión:", error); // Registra el error en la consola para depuración.
      alert("Error al cerrar sesión."); // Muestra un mensaje de alerta al usuario.
    }
  };

  // Renderiza el contenido del componente.
  return (
    <div className="home-container"> {/* Contenedor principal con clase CSS para estilos. */}
      <h1>Bienvenido a la página principal</h1> {/* Encabezado con un mensaje de bienvenida. */}
      <button onClick={handleLogout} className="button"> {/* Botón que ejecuta la función de cierre de sesión. */}
        Cerrar sesión
      </button>
    </div>
  );
};

// Exportamos el componente para su uso en otras partes de la aplicación.
export default Home;

// Indicamos que este archivo utiliza el modo "strict mode" de React, lo que ayuda a identificar problemas potenciales
"use client";

// Importación de React para poder usar JSX y otros recursos de React
import React from "react";

// Importación de la hoja de estilos de FirebaseUI para que los componentes de autenticación de Firebase tengan el estilo correcto
import "firebaseui/dist/firebaseui.css";

// Importación de los módulos de React Router para gestionar la navegación entre las diferentes rutas de la aplicación
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importación de GoogleOAuthProvider desde la librería @react-oauth/google para integrar la autenticación de Google OAuth en la aplicación
import { GoogleOAuthProvider } from "@react-oauth/google";

// Importación de los componentes de la aplicación para las distintas rutas definidas
import SignIn from "./components/LogIn/SignIn/SignIn";
import SignUp from "./components/LogIn/SignUp/SignUp";
import Feed from "./components/Feed/Feed";
import Home from "./components/Home/Home";

// Importación de la hoja de estilos global de la aplicación
import "./App.css";

class App extends React.Component {
 
  render() {
    // Carga el clientId desde las variables de entorno para configurar la autenticación de Google
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    // Verifica si el clientId no está definido y muestra un mensaje de error en la consola y en la interfaz si es el caso
    if (!clientId) {
      console.error("Google Client ID is not defined. Please check your environment variables.");
      return <h1>Error: Missing configuration</h1>;
    }

 
    return (
      // Proveedor de autenticación de Google con el clientId cargado desde las variables de entorno
      <GoogleOAuthProvider clientId={clientId}>
        {/* Configuración de enrutador para gestionar la navegación de la aplicación */}
        <Router>
          {/* Definición de las rutas de la aplicación */}
          <Routes>
            {/* Ruta para la página de inicio de sesión */}
            <Route path="/" element={<SignIn />} />
            {/* Ruta para la página de registro */}
            <Route path="/SignUp" element={<SignUp />} />
            {/* Ruta para la página de feed */}
            <Route path="/Feed" element={<Feed />} />
            {/* Ruta para la página de inicio o principal */}
            <Route path="/Home" element={<Home />} />
            {/* Ruta por defecto para manejar las URLs no definidas */}
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    );
  }
}

// Exportación de la clase App para que pueda ser utilizada en otros archivos de la aplicación
export default App;

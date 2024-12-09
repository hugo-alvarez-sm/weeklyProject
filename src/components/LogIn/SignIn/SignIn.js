// src/components/SignIn/SignIn.js

// Importamos las dependencias necesarias.
import React, { useState, useEffect } from "react"; // Importa React y hooks.
import { useNavigate } from "react-router-dom"; // Hook de React Router para la navegación.
import ParticlesComponent from "../../ParticlesComponent"; // Componente de partículas de fondo.
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth"; // Funciones de Firebase para autenticación.
import { auth, db } from "../../../services/firebase"; // Importamos la instancia de Firebase y Firestore.
import { doc, getDoc, setDoc } from "firebase/firestore"; // Funciones de Firestore.
import "./SignIn.css";

/**
 * Componente funcional SignIn.
 * Proporciona una interfaz para que los usuarios inicien sesión con correo/contraseña
 * o mediante Google Authentication.
 */
const SignIn = () => {
  // Estados locales para manejar el formulario y errores.
  const [username, setUsername] = useState(""); // Estado para el nombre de usuario.
  const [password, setPassword] = useState(""); // Estado para la contraseña.
  const [error, setError] = useState(""); // Estado para manejar errores de autenticación.

  // Hook de navegación para redirigir entre rutas.
  const navigate = useNavigate();

  /**
   * Efecto que detecta cambios en el estado de autenticación del usuario.
   * Si el usuario ya está autenticado, redirige automáticamente al home.
   */
  useEffect(() => {
    // Suscribe a la función de cambio de estado de autenticación.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuario ya autenticado:", user);
        navigate("/Home"); // Redirige al home si el usuario está autenticado.
      }
    });

    return () => unsubscribe(); // Limpia la suscripción cuando el componente se desmonta.
  }, [navigate]);

  /**
   * Maneja los cambios en el input del nombre de usuario.
   * @param {Event} event - El evento de cambio en el input.
   */
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  /**
   * Maneja los cambios en el input de la contraseña.
   * @param {Event} event - El evento de cambio en el input.
   */
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  /**
   * Maneja el inicio de sesión con correo electrónico y contraseña.
   * @param {Event} event - El evento de envío del formulario.
   */
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto de enviar el formulario.
    try {
      // Intenta iniciar sesión con correo y contraseña.
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password,
      );
      const user = userCredential.user;
      console.log("Usuario autenticado con email:", user);
      navigate("/Home"); // Redirige al home si la autenticación es exitosa.
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(
        "Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.",
      );
    }
  };

  /**
   * Maneja el inicio de sesión mediante Google Authentication.
   */
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider(); // Crea una instancia de GoogleAuthProvider.
    try {
      // Inicia sesión con Google mediante una ventana emergente.
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuario autenticado con Google:", user);

      // Extrae información del usuario.
      const email = user.email;
      const firstName = user.displayName
        ? user.displayName.split(" ")[0]
        : "Usuario";

      // Referencia al documento del usuario en Firestore.
      const userDocRef = doc(db, "users", email);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Crea un nuevo documento si el usuario no existe.
        await setDoc(userDocRef, {
          email: email,
          firstName: firstName,
          // Agrega más campos según sea necesario.
        });
        console.log("Nuevo usuario registrado en Firestore:", {
          email,
          firstName,
        });
      } else {
        console.log("Usuario ya registrado en Firestore:", userDoc.data());
      }

      navigate("/home"); // Redirige al home después de iniciar sesión con Google.
    } catch (error) {
      console.error("Error en autenticación con Google:", error);
      setError(
        "No se pudo iniciar sesión con Google. Por favor, inténtalo de nuevo.",
      );
    }
  };

  return (
    <>
      <div className="card-holder">
        {" "}
        {/* Contenedor principal con clase CSS para estilos. */}
        <ParticlesComponent id="tsparticles" />{" "}
        {/* Componente de fondo animado. */}
        <div className="card-container">
          {" "}
          {/* Tarjeta de inicio de sesión con estilo. */}
          <img src="/searchlogonobg.png" alt="Logo" className="logo" />{" "}
          {/* Logo de la aplicación. */}
          <form onSubmit={handleSubmit}>
            {" "}
            {/* Formulario de inicio de sesión. */}
            <div className="input-group">
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Correo electrónico"
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Contraseña"
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}{" "}
            {/* Muestra mensaje de error si existe. */}
            <button type="submit" className="button">
              Iniciar sesión
            </button>{" "}
            {/* Botón de envío. */}
          </form>
          <div className="separator">O</div>{" "}
          {/* Separador de opciones de inicio de sesión. */}
          <div className="google-button-container">
            {" "}
            {/* Contenedor del botón de Google. */}
            <button onClick={handleGoogleLogin} className="google-button">
              <span className="google-logo"></span> {/* Icono de Google. */}
              Iniciar sesión con Google
            </button>
          </div>
          <div className="SignUp-text">
            {" "}
            {/* Enlace de registro para nuevos usuarios. */}
            ¿No tienes una cuenta?{" "}
            <a href="/SignUp" className="sign-up-link">
              Regístrate
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

// Exportamos el componente para su uso en otras partes de la aplicación.
export default SignIn;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ParticlesComponent from "../../ParticlesComponent";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../../services/firebase";
import { db } from "../../../services/firebase"; // Asegúrate de importar Firestore
import { doc, getDoc, setDoc } from "firebase/firestore"; // Importa las funciones necesarias
import "./SignIn.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuario ya autenticado:", user);
        navigate("/Home");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password,
      );
      const user = userCredential.user;
      console.log("Usuario autenticado con email:", user);
      navigate("/Home");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(
        "Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.",
      );
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuario autenticado con Google:", user);

      // Obtener información del usuario
      const email = user.email;
      const firstName = user.displayName
        ? user.displayName.split(" ")[0]
        : "Usuario";

      // Comprobar si el usuario ya está registrado en Firestore
      const userDocRef = doc(db, "users", email);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Si no existe, crear un nuevo documento
        await setDoc(userDocRef, {
          email: email,
          firstName: firstName,
          // Puedes agregar más campos si es necesario
        });
        console.log("Nuevo usuario registrado en Firestore:", {
          email,
          firstName,
        });
      } else {
        console.log("Usuario ya registrado en Firestore:", userDoc.data());
      }

      navigate("/home");
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
        <ParticlesComponent id="tsparticles" />
        <div className="card-container">
          <img src="/searchlogonobg.png" alt="Logo" className="logo" />

          <form onSubmit={handleSubmit}>
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
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="button">
              Iniciar sesión
            </button>
          </form>

          <div className="separator">O</div>

          {/* Botón de Google actualizado */}
          <div className="google-button-container">
            <button onClick={handleGoogleLogin} className="google-button">
              <span className="google-logo"></span>
              Iniciar sesión con Google
            </button>
          </div>

          <div className="SignUp-text">
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

export default SignIn;

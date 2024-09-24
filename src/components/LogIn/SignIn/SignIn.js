import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import ParticlesComponent from "../../ParticlesComponent";
import { GoogleLogin } from "@react-oauth/google";
import { signInWithEmailAndPassword } from "firebase/auth"; // Importa signInWithEmailAndPassword de Firebase
import { auth } from "../../../services/firebase"; // Importa auth desde tu configuración de Firebase
import "./SignIn.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para manejar errores
  const navigate = useNavigate(); // Crea una instancia de navigate

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Autentica al usuario con Firebase usando email y contraseña
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password,
      );
      const user = userCredential.user;
      console.log("Usuario autenticado:", user);
      // Redirige a la página de inicio tras el inicio de sesión exitoso
      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(
        "Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.",
      );
    }
  };

  const onSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    console.log("Login exitoso, token:", token);
    alert("Login correcto");
    navigate("/home"); // Redirige a /home
  };

  const onFailure = () => {
    console.log("Login Fallido");
    alert("Login fallido");
  };

  return (
    <div className="card-holder">
      <ParticlesComponent id="tsparticles" />
      <div className="card-container">
        {/* Logo de la web */}
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
          {error && <p className="error-message">{error}</p>} {""}
          <button type="submit" className="button">
            Iniciar sesión
          </button>
        </form>

        <div className="separator">O</div>

        <div className="google-button-container">
          <GoogleLogin
            text="Iniciar sesión con Google"
            onSuccess={onSuccess}
            onError={onFailure}
          />
        </div>

        <div className="SignUp-text">
          ¿No tienes una cuenta?{" "}
          <a href="/SignUp" className="sign-up-link">
            Regístrate
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

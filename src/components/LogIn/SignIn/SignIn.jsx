import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

import "./SignIn.scss"; // Importa el archivo CSS para los estilos

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar lógica para manejar la autenticación
  };

  const onSuccess = () => {
    // Muestra una notificación de éxito
    alert("Login correcto");
  };

  const onFailure = () => {
    // Muestra una notificación de error
    alert("Login fallido");
  };

  return (
    <div className="card-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="button">
          Sign in
        </button>
      </form>
      <div className="separator">OR</div>
      {/* Botón de Google */}
      <GoogleLogin
        className="google-button"
        text="Sign in with Google"
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      {/* Texto y enlace para registrarse */}
      <div className="SignUp-text">
        Don't have an account?{" "}
        <a href="/SignUp" className="sign-up-link">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default SignIn;

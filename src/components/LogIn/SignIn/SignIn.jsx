import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import "./SignIn.scss";

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
  };

  const getEmailFromJwt = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.email) {
        return decodedToken.email;
      } else {
        throw new Error("Email not found in token");
      }
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  const onSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const email = getEmailFromJwt(token);
    console.log("User email:", email);
    alert(`Login correcto: ${email}`);
  };

  const onFailure = () => {
    console.log("Login Failed");
    alert("Login fallido");
  };

  return (
    <div className="card-holder">
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
        <GoogleLogin
          className="google-button"
          text="Sign in with Google"
          onSuccess={onSuccess}
          onError={onFailure}
        />
        <div className="SignUp-text">
          Don't have an account?{" "}
          <a href="/SignUp" className="sign-up-link">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

import React from 'react';
import { GoogleLogin } from "@react-oauth/google";
import './SignIn.css'; // Importa el archivo CSS para los estilos

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: ''
        };
      }
    
      handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
      }
    
      handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
      }
    
      handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar lógica para manejar la autenticación
      }

  onSuccess = () => {
    // Muestra una notificación de éxito
    alert("Login correcto");
  }

  onFailure = () => {
    // Muestra una notificación de error
    alert("Login fallido");
  }

  render() {
    return (
      <div className="container">
        <h1>Sign in</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              placeholder="Username"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="button">Sign in</button>
          {/* Botón de Google */}
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </form>
        {/* Texto y enlace para registrarse */}
        <p>Don't have an account? <a href="/SignUp" className="sign-up-link">Sign Up</a></p>
      </div>
    );
  }
}

export default SignIn;

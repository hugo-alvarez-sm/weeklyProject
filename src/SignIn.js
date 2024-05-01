import React from 'react';
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
          <button className="button google-button">Sign in with Google</button>
        </form>
        {/* Texto y enlace para registrarse */}
        <p>Don't have an account? <a href="#" className="sign-up-link">Sign Up</a></p>
      </div>
    );
  }
}

export default SignIn;

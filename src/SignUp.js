import React from 'react';
import './SignUp.css';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            gender: '',
            dateOfBirth: '',
            email: '',
            password: '',
            confirmPassword: '', // Agregado confirmPassword al estado inicial
            step: 1
        };
    }

    handleFirstNameChange = (event) => {
        this.setState({ firstName: event.target.value });
    }

    handleLastNameChange = (event) => {
        this.setState({ lastName: event.target.value });
    }

    handleGenderChange = (event) => {
        this.setState({ gender: event.target.value });
    }

    handleDateOfBirthChange = (event) => {
        this.setState({ dateOfBirth: event.target.value });
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    handleConfirmPasswordChange = (event) => {
        this.setState({ confirmPassword: event.target.value });
    }

    handleSubmitFirstStep = (event) => {
        event.preventDefault();
        // Aquí puedes agregar lógica para manejar el envío del primer paso
        this.setState({ step: 2 });
    }

    handleSubmitSecondStep = (event) => {
        event.preventDefault();
        // Verificar si las contraseñas coinciden antes de continuar
        if (this.state.password === this.state.confirmPassword) {
            // Aquí puedes agregar lógica para manejar el envío del segundo paso
        } else {
            alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
        }
    }

    render() {
        const { step } = this.state;

        return (
            <div className="container">
                <h1>Datos de usuario</h1>
                <div className="progress-container">
                    <div className={`progress-step ${step >= 1 && 'active'}`}>
                        <div className="step-number">1</div>
                    </div>
                    <div className="progress-line"></div>
                    <div className={`progress-step ${step >= 2 && 'active'}`}>
                        <div className="step-number">2</div>
                    </div>
                </div>
                {step === 1 && (
                    <form onSubmit={this.handleSubmitFirstStep}>
                        <div className="input-group">
                            <input
                                type="text"
                                value={this.state.firstName}
                                onChange={this.handleFirstNameChange}
                                placeholder="Nombre"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                value={this.state.lastName}
                                onChange={this.handleLastNameChange}
                                placeholder="Apellidos"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <select
                                value={this.state.gender}
                                onChange={this.handleGenderChange}
                                className="select">
                                <option value="Hombre">Hombre</option>
                                <option value="Mujer">Mujer</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <input
                                type="date"
                                value={this.state.dateOfBirth}
                                onChange={this.handleDateOfBirthChange}
                                placeholder="Fecha de nacimiento"
                                required
                            />
                        </div>
                        <button type="submit" className="button">Continuar</button>
                    </form>
                )}
                {step === 2 && (
                    <form onSubmit={this.handleSubmitSecondStep}>
                        <div className="input-group">
                            <input
                                type="email"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                                placeholder="Correo electrónico"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                placeholder="Contraseña"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                value={this.state.confirmPassword}
                                onChange={this.handleConfirmPasswordChange}
                                placeholder="Confirmar Contraseña"
                                required
                            />
                        </div>
                        <button type="submit" className="button">Registrarse</button>
                    </form>
                )}
            </div>
        );
    }
}

export default SignUp;

import React, { useState } from "react";

import "./SignUp.scss";
import classNames from "classnames";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const maxSteps = 2;
  const [form, setForm] = useState({});

  const handleSubmitFirstStep = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setForm((f) => ({
      ...f,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      gender: formData.get("gender"),
      dateOfBirth: formData.get("dateOfBirth"),
    }));
    setStep((s) => ++s);
  };

  const handleSubmitSecondStep = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Verificar si las contraseñas coinciden antes de continuar
    if (formData.get("password") === formData.get("confirmPassword")) {
      setForm((f) => ({
        ...f,
        email: formData.get("email"),
        password: formData.get("password"),
      }));
      setStep((s) => ++s);
    } else {
      alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
    }
  };

  const getProgress = () => {
    return (
      <div className="progress-container">
        {/* <div className={`progress-step ${step >= 1 && "active"}`}>
          <div className="step-number">1</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step >= 2 && "active"}`}>
          <div className="step-number">2</div>
        </div> */}
        {/* <div className="progress-blob empty"></div>
        <div className="progress-blob half"></div>
        <div className="progress-blob full"></div> */}
        {[...Array(maxSteps + 1).keys()].slice(1).map((i) => {
          return (
            <>
              <div
                key={i}
                className={classNames("progress-blob", {
                  empty: i > step,
                  half: i === step,
                  active: i === step,
                  full: i < step,
                })}
              ></div>
              {i < maxSteps && <div className="progress-line"></div>}
            </>
          );
        })}
      </div>
    );
  };

  return (
    <div className="card-container">
      <h1>Datos de usuario</h1>
      {getProgress()}
      {step === 1 && (
        <form onSubmit={handleSubmitFirstStep}>
          <div className="input-group">
            <input type="text" name="firstName" placeholder="Nombre" required />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="lastName"
              placeholder="Apellidos"
              required
            />
          </div>
          <div className="input-group select">
            <select name="gender" className="select">
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="input-group">
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Fecha de nacimiento"
              required
            />
          </div>
          <button type="submit" className="button">
            Continuar
          </button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmitSecondStep}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Contraseña"
              required
            />
          </div>
          <button type="submit" className="button">
            Registrarse
          </button>
        </form>
      )}
      {/* Texto y enlace para registrarse */}
      <div className="LogIn-text">
        Already have an account?{" "}
        <a href="/" className="sign-up-link">
          Log In
        </a>
      </div>
    </div>
  );
};

export default SignUp;

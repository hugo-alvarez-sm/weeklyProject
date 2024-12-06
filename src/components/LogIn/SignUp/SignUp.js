import React, { useState } from "react";
import { auth, db } from "../../../services/firebase"; // Importa auth y db desde firebase.js
import { createUserWithEmailAndPassword } from "firebase/auth"; // Para crear el usuario
import { doc, setDoc } from "firebase/firestore"; // Para guardar datos en Firestore
import { useNavigate } from "react-router-dom"; // Para redirigir al usuario
import ParticlesComponent from "../../ParticlesComponent";
import "./SignUp.css";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const maxSteps = 2;
  const [form, setForm] = useState({});
  const [userCreated, setUserCreated] = useState(false); // Nuevo estado para controlar el éxito
  const navigate = useNavigate(); // Hook para navegar a otra página

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

  const handleSubmitSecondStep = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    if (formData.get("password") === formData.get("confirmPassword")) {
      setForm((f) => ({
        ...f,
        email: formData.get("email"),
        password: formData.get("password"),
      }));

      try {
        // 1. Crear el usuario en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.get("email"),
          formData.get("password"),
        );

        const user = userCredential.user;

        // 2. Almacenar información adicional en Firestore
        await setDoc(doc(db, "users", user.uid), {
          firstName: form.firstName,
          lastName: form.lastName,
          gender: form.gender,
          dateOfBirth: form.dateOfBirth,
          email: formData.get("email"),
        });

        setUserCreated(true); // Actualiza el estado para indicar que el usuario fue creado
      } catch (error) {
        console.error("Error creando el usuario:", error);
        alert("Error al crear el usuario: " + error.message);
      }
    } else {
      alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
    }
  };

  // Función para redirigir al home
  const handleContinue = () => {
    navigate("/home");
  };

  const getProgress = () => {
    const progressBlobs = [...Array(maxSteps + 1).keys()].slice(1).map((i) =>
      React.createElement(
        React.Fragment,
        { key: i },
        React.createElement("div", {
          className: `progress-blob ${i > step ? "empty" : ""} ${
            i === step ? "half active" : ""
          } ${i < step ? "full" : ""}`,
        }),
        i < maxSteps &&
          React.createElement("div", { className: "progress-line" }),
      ),
    );

    return React.createElement(
      "div",
      { className: "progress-container" },
      progressBlobs,
    );
  };

  return (
    <div className="sign-up-container">
      <ParticlesComponent id="tsparticles" />
      <div className="card-holder">
        <div className="card-container">
          {userCreated ? (
            // Mostrar mensaje de éxito, logo e botón de "Continuar"
            <div className="success-message">
              <img src="/searchlogonobg.png" alt="Logo" className="logo" />{" "}
              {/* Imagen del logo */}
              <h1>¡Usuario creado exitosamente!</h1>
              <button onClick={handleContinue} className="button">
                Continuar
              </button>
            </div>
          ) : (
            <>
              <h1>Datos de usuario</h1>
              {getProgress()}
              {step === 1 && (
                <form onSubmit={handleSubmitFirstStep}>
                  <div className="input-group">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Nombre"
                      required
                    />
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
            </>
          )}
          <br></br>
          {!userCreated && (
            <div className="LogIn-text">
              Already have an account?
              <a href="/" className="sign-up-link">
                Log In
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;

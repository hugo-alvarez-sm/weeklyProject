// Importa React y useState para gestionar el estado del componente
import React, { useState } from "react";
// Importa los servicios de autenticación y Firestore desde el archivo de configuración de Firebase
import { auth, db } from "../../../services/firebase"; 
// Importa las funciones necesarias de Firebase para crear un usuario y guardar datos
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { doc, setDoc } from "firebase/firestore"; 
// Importa el hook de React Router para la navegación
import { useNavigate } from "react-router-dom"; 
// Importa el componente de partículas para la animación de fondo
import ParticlesComponent from "../../ParticlesComponent";
// Importa el archivo de estilos CSS para la página de registro
import "./SignUp.css";

/**
 * Componente que gestiona el proceso de registro de un nuevo usuario.
 * Se divide en dos pasos, donde el primer paso recopila información personal y el segundo paso recopila las credenciales de acceso.
 */
const SignUp = () => {
  // Estado para rastrear el paso actual del formulario (1 o 2)
  const [step, setStep] = useState(1);
  // Número total de pasos en el formulario
  const maxSteps = 2;
  // Estado para almacenar la información del formulario
  const [form, setForm] = useState({});
  // Estado para controlar si el usuario ha sido creado con éxito
  const [userCreated, setUserCreated] = useState(false);
  // Hook de navegación para redirigir al usuario a la página de inicio
  const navigate = useNavigate();

  /**
   * Maneja el envío del primer paso del formulario.
   * @param {Event} event - El evento de envío del formulario.
   */
  const handleSubmitFirstStep = (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto de envío del formulario
    const formData = new FormData(event.target); // Captura los datos del formulario

    // Actualiza el estado 'form' con los datos recopilados
    setForm((f) => ({
      ...f,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      gender: formData.get("gender"),
      dateOfBirth: formData.get("dateOfBirth"),
    }));
    // Avanza al siguiente paso del formulario
    setStep((s) => ++s);
  };

  /**
   * Maneja el envío del segundo paso del formulario.
   * @param {Event} event - El evento de envío del formulario.
   */
  const handleSubmitSecondStep = async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto de envío del formulario
    const formData = new FormData(event.target);

    // Verifica si la contraseña y la confirmación de la contraseña coinciden
    if (formData.get("password") === formData.get("confirmPassword")) {
      // Actualiza el estado 'form' con los datos de correo electrónico y contraseña
      setForm((f) => ({
        ...f,
        email: formData.get("email"),
        password: formData.get("password"),
      }));

      try {
        // 1. Crea un usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.get("email"),
          formData.get("password")
        );

        const user = userCredential.user;

        // 2. Almacena la información adicional del usuario en Firestore
        await setDoc(doc(db, "users", user.uid), {
          firstName: form.firstName,
          lastName: form.lastName,
          gender: form.gender,
          dateOfBirth: form.dateOfBirth,
          email: formData.get("email"),
        });

        // Indica que el usuario ha sido creado con éxito
        setUserCreated(true);
      } catch (error) {
        console.error("Error creando el usuario:", error);
        alert("Error al crear el usuario: " + error.message); // Muestra un mensaje de error si falla la creación
      }
    } else {
      alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo."); // Mensaje si las contraseñas no coinciden
    }
  };

  /**
   * Función para redirigir al usuario a la página de inicio después de la creación de la cuenta.
   */
  const handleContinue = () => {
    navigate("/home");
  };

  /**
   * Genera y devuelve el progreso visual del formulario.
   * @returns {JSX.Element} - Elemento JSX que representa el progreso del formulario.
   */
  const getProgress = () => {
    const progressBlobs = [...Array(maxSteps + 1).keys()].slice(1).map((i) =>
      React.createElement(
        React.Fragment,
        { key: i },
        React.createElement("div", {
          className: `progress-blob ${i > step ? "empty" : ""} ${
            i === step ? "half active" : ""
          } ${i < step ? "full" : ""}`
        }),
        i < maxSteps &&
          React.createElement("div", { className: "progress-line" })
      ),
    );

    return React.createElement(
      "div",
      { className: "progress-container" },
      progressBlobs
    );
  };

  // Renderiza el contenido del componente
  return (
    <div className="sign-up-container">
      <ParticlesComponent id="tsparticles" /> {/* Componente de fondo animado */}
      <div className="card-holder">
        <div className="card-container">
          {userCreated ? (
            // Muestra un mensaje de éxito si el usuario ha sido creado
            <div className="success-message">
              <img src="/searchlogonobg.png" alt="Logo" className="logo" />
              <h1>¡Usuario creado exitosamente!</h1>
              <button onClick={handleContinue} className="button">
                Continuar
              </button>
            </div>
          ) : (
            <>
              <h1>Datos de usuario</h1>
              {getProgress()} {/* Muestra la barra de progreso */}
              {step === 1 && (
                <form onSubmit={handleSubmitFirstStep}>
                  {/* Campos para la primera etapa del registro */}
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
                  {/* Campos para la segunda etapa del registro */}
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

// Exporta el componente para usarlo en otras partes de la aplicación
export default SignUp;

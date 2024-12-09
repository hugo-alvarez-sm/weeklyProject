// Importa las funciones principales de Firebase necesarias para inicializar la aplicación y utilizar sus servicios
import { initializeApp } from "firebase/app"; // Inicializa la aplicación de Firebase
import { getAuth } from "firebase/auth"; // Permite el uso de servicios de autenticación
import { getFirestore } from "firebase/firestore"; // Permite interactuar con la base de datos Firestore

// Configuración de Firebase con las credenciales del proyecto
// Nota: Estas credenciales deben ser protegidas en entornos de producción. Considere utilizar variables de entorno para mayor seguridad.
const firebaseConfig = {
  apiKey: "AIzaSyC6qpOkAeUuC6bx7EzgdFW3XBISrpNo5Sc",
  authDomain: "searchnotes-f8cb4.firebaseapp.com",
  projectId: "searchnotes-f8cb4",
  storageBucket: "searchnotes-f8cb4.appspot.com",
  messagingSenderId: "715631773424",
  appId: "1:715631773424:web:f771d66eca43ff690f6435",
  measurementId: "G-3HBCSHG0XF",
};

// Inicializa la aplicación de Firebase con la configuración proporcionada
const app = initializeApp(firebaseConfig);

// Crea instancias de los servicios de Firebase que serán utilizados
const auth = getAuth(app); // Inicializa el servicio de autenticación
const db = getFirestore(app); // Inicializa el servicio de Firestore

// Exporta las instancias de los servicios para su uso en otras partes de la aplicación
export { auth, db };

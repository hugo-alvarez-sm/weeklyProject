// Importa las funciones principales de Firebase necesarias para inicializar la aplicación y utilizar sus servicios
import { initializeApp } from "firebase/app"; // Inicializa la aplicación de Firebase
import { getAuth } from "firebase/auth"; // Permite el uso de servicios de autenticación
import { getFirestore } from "firebase/firestore"; // Permite interactuar con la base de datos Firestore

// Configuración de Firebase con las credenciales del proyecto a traves de .env
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY, 
  authDomain: process.env.REACT_APP_AUTH_DOMAIN, 
  projectId: process.env.REACT_APP_PROJECT_ID, 
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET, 
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID, 
  appId: process.env.REACT_APP_APP_ID, 
  measurementId: process.env.REACT_APP_MEASUREMENT_ID, 
};

// Inicializa la aplicación de Firebase con la configuración proporcionada
const app = initializeApp(firebaseConfig);

// Crea instancias de los servicios de Firebase que serán utilizados
const auth = getAuth(app); // Inicializa el servicio de autenticación
const db = getFirestore(app); // Inicializa el servicio de Firestore

// Exporta las instancias de los servicios para su uso en otras partes de la aplicación
export { auth, db };

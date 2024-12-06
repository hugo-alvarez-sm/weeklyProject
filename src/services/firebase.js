import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6qpOkAeUuC6bx7EzgdFW3XBISrpNo5Sc",
  authDomain: "searchnotes-f8cb4.firebaseapp.com",
  projectId: "searchnotes-f8cb4",
  storageBucket: "searchnotes-f8cb4.appspot.com",
  messagingSenderId: "715631773424",
  appId: "1:715631773424:web:f771d66eca43ff690f6435",
  measurementId: "G-3HBCSHG0XF",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar los servicios que vas a usar
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAK_w2VCf2m1JuwIwN8pFEXMcyH9MyxPEE",
  authDomain: "weekly-eae9a.firebaseapp.com",
  projectId: "weekly-eae9a",
  storageBucket: "weekly-eae9a.appspot.com",
  messagingSenderId: "658246260243",
  appId: "1:658246260243:web:16d78edf48bbf8e70c51e6",
  measurementId: "G-L6FS42WV2Y",
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar los servicios que vas a usar
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

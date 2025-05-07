// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwZ9cuJoeUBB9tSE_oENyFUyb7tQ2nUyI",
  authDomain: "mindmapper-b7d3b.firebaseapp.com",
  projectId: "mindmapper-b7d3b",
  storageBucket: "mindmapper-b7d3b.firebasestorage.app",
  messagingSenderId: "965138062314",
  appId: "1:965138062314:web:021c0756f0de6aa5a5f093",
  measurementId: "G-S2YZKCSWJQ"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
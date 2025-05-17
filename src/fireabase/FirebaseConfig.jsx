// src/firebase/FirebaseConfig.jsx

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIZiTkUHEPn9sQk_xFWSpABAyLzsAjkvg",
  authDomain: "ecommerce-3360c.firebaseapp.com",
  projectId: "ecommerce-3360c",
  storageBucket: "ecommerce-3360c.appspot.com",
  messagingSenderId: "553145497145",
  appId: "1:553145497145:web:ba8485f1bbb1cfac58ffe8"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const fireDB = getFirestore(app);

export { auth, fireDB };

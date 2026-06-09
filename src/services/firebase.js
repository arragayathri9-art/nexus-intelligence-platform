import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIQjxARsmE4HR6tvNEv_BoIvcrHhB4ykc",
  authDomain: "nexus-intelligence-syste-5bfa2.firebaseapp.com",
  projectId: "nexus-intelligence-syste-5bfa2",
  storageBucket: "nexus-intelligence-syste-5bfa2.firebasestorage.app",
  messagingSenderId: "178072178140",
  appId: "1:178072178140:web:eb31aa9558718f32929319"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
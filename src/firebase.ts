// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBe8C06KUiVcUpZ5SlBLK3YNS5f2kjdSgE",
  authDomain: "taskboard-a246f.firebaseapp.com",
  projectId: "taskboard-a246f",
  storageBucket: "taskboard-a246f.appspot.com",
  messagingSenderId: "781426510589",
  appId: "1:781426510589:web:91d27ed27b06ee6e844c94",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

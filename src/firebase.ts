import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

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
const storage = getStorage(app);
const path = "taskBoard";

export { db, storage, path };

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKlmZYdSzRE6XWhkS81X8sYmqKGSaIf-c",
  authDomain: "vue3-todo-ac261.firebaseapp.com",
  projectId: "vue3-todo-ac261",
  storageBucket: "vue3-todo-ac261.appspot.com",
  messagingSenderId: "803805516683",
  appId: "1:803805516683:web:417efac30bb84300bb558e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
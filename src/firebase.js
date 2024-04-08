// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBm2_-Z8m3s-5EhmqiJ1bjNwcw4R40vj4Q",
  authDomain: "chatbot-database-cb6fe.firebaseapp.com",
  projectId: "chatbot-database-cb6fe",
  storageBucket: "chatbot-database-cb6fe.appspot.com",
  messagingSenderId: "942949212643",
  appId: "1:942949212643:web:226772e4f7cb91bc7300d6",
  measurementId: "G-L651XGLJG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
//const analytics = getAnalytics(app);
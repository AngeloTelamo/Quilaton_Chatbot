// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//personal dev databse 

const firebaseConfig = {
  apiKey: "AIzaSyCFuuVYd0BoFtYJ6tIXNxT3eaBaOzhDqko",
  authDomain: "chatbot-fc1e7.firebaseapp.com",
  projectId: "chatbot-fc1e7",
  storageBucket: "chatbot-fc1e7.appspot.com",
  messagingSenderId: "589716993328",
  appId: "1:589716993328:web:3ae6c30e016a4caaa044f5",
  measurementId: "G-PEQW7DSNW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
//const analytics = getAnalytics(app);
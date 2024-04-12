// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBm2_-Z8m3s-5EhmqiJ1bjNwcw4R40vj4Q",
//   authDomain: "chatbot-database-cb6fe.firebaseapp.com",
//   projectId: "chatbot-database-cb6fe",
//   storageBucket: "chatbot-database-cb6fe.appspot.com",
//   messagingSenderId: "942949212643",
//   appId: "1:942949212643:web:226772e4f7cb91bc7300d6",
//   measurementId: "G-L651XGLJG2"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDmqGRl1yXVd5-UbVbSK3GqHFsExOgCTso",
  authDomain: "chatbot-954b3.firebaseapp.com",
  projectId: "chatbot-954b3",
  storageBucket: "chatbot-954b3.appspot.com",
  messagingSenderId: "984216850141",
  appId: "1:984216850141:web:e980e5c93fb538dc30d534",
  measurementId: "G-GRQLP2V1B2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
//const analytics = getAnalytics(app);
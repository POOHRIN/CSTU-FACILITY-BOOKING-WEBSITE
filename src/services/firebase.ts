// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8uknAeaSB_4bBDYmUBVx6C40C2N0a-kk",
  authDomain: "cstu-facility-booking.firebaseapp.com",
  databaseURL: "https://cstu-facility-booking-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cstu-facility-booking",
  storageBucket: "cstu-facility-booking.firebasestorage.app",
  messagingSenderId: "397907680612",
  appId: "1:397907680612:web:4626af4b9022295f706e71",
  measurementId: "G-XSM5F3VWK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


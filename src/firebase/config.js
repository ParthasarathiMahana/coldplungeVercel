// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoPZCwAXke0vxPWHfojEuKV3-NnSA1QXU",
  authDomain: "coldplunge-3cd16.firebaseapp.com",
  projectId: "coldplunge-3cd16",
  storageBucket: "coldplunge-3cd16.appspot.com",
  messagingSenderId: "284922268181",
  appId: "1:284922268181:web:94c8361191d0e0be285c1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
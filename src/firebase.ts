// Import the functions you need from the SDKs you need

import "firebase/firestore";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB78xRVePuYrUsQscPc5OqDcMPIJ9UPUSU",
  authDomain: "tourism-f262a.firebaseapp.com",
  projectId: "tourism-f262a",
  storageBucket: "tourism-f262a.appspot.com",
  messagingSenderId: "67867833421",
  appId: "1:67867833421:web:e7a2918fbf223a251b5804",
};

/* const firebaseConfig = {
  apiKey: "AIzaSyD7_E2ZQ968r_THrrktAsRvTDbF_h-GVho",
  authDomain: "estc-app.firebaseapp.com",
  projectId: "estc-app",
  storageBucket: "estc-app.appspot.com",
  messagingSenderId: "43708951651",
  appId: "1:43708951651:web:7579743a9da83e0d991c56",
}; */

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

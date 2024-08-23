// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARaQpld55ljEy211xiUMCe_GZCRXXPTHE",
  authDomain: "nie-smart-library.firebaseapp.com",
  projectId: "nie-smart-library",
  storageBucket: "nie-smart-library.appspot.com",
  messagingSenderId: "713241092474",
  appId: "1:713241092474:web:2829a03dc95b8e881536c3",
  measurementId: "G-L3Y8JHE2MJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage}

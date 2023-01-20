// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1ZMH5jHQPnXyy83XkoBTI8OOJOVzqCI8",
    authDomain: "realty-b9e47.firebaseapp.com",
    projectId: "realty-b9e47",
    storageBucket: "realty-b9e47.appspot.com",
    messagingSenderId: "520515964515",
    appId: "1:520515964515:web:2da40f609d9a484feb3256"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
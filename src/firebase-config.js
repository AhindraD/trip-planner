// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBlRHasrTvZUUKrp-GeBdLSJmvT0HL7YsY",
    authDomain: "trip-planner-react.firebaseapp.com",
    projectId: "trip-planner-react",
    storageBucket: "trip-planner-react.appspot.com",
    messagingSenderId: "238231123678",
    appId: "1:238231123678:web:2305b5f0c3d8c7dddcb44f",
    measurementId: "G-S4P39HN96C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
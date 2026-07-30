
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase, ref, set, push, onValue, get, update, remove } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyAzgyBv5YvZJrYVYjGhoU9fWw7QjBn810I",
    authDomain: "matrix-edge-a56b7.firebaseapp.com",
    databaseURL: "https://matrix-edge-a56b7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "matrix-edge-a56b7",
    storageBucket: "matrix-edge-a56b7.firebasestorage.app",
    messagingSenderId: "556589761298",
    appId: "1:556589761298:web:b0bfe15565176f9367a9cb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export const accountRef = ref;
export const pushAccount = push;
export const liveOnValue = onValue;

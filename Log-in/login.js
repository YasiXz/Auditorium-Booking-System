// Import the functions you need from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAAyRxjj_rJ5ivrn8zvubSobIjWVFGPw4",
    authDomain: "auditoriumbookingsystem-24.firebaseapp.com",
    databaseURL: "https://auditoriumbookingsystem-24-default-rtdb.firebaseio.com",
    projectId: "auditoriumbookingsystem-24",
    storageBucket: "auditoriumbookingsystem-24.firebasestorage.app",
    messagingSenderId: "879998771592",
    appId: "1:879998771592:web:ecb4112205181259451a3d",
    measurementId: "G-XDC3NQCXVN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Auth

// Sign in function
async function signIn(e) {
    e.preventDefault(); // Prevent the form from submitting

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        try {
            // Sign in the user with Firebase Authentication
            await signInWithEmailAndPassword(auth, email, password);
            alert("Logged in successfully!");

            // Redirect to homepage or another page
            window.location.href = "../index/index.html"; // Replace with your desired redirect page

            // Reset the form
            document.getElementById('loginForm').reset();
        } catch (error) {
            console.error("Error signing in:", error);
            alert(`Error: ${error.message}`);
        }
    } else {
        alert("Please fill in all fields.");
    }
}

// Add event listener to the form submit button
document.getElementById('loginForm').addEventListener('submit', signIn);

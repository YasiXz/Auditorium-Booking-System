// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

// Firebase configuration
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
const auth = getAuth(app); // Initialize Firebase Authentication

// Sign-in function
document.getElementById("signinForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Firebase sign-in
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        alert("Sign-in successful!");

        // Redirect to a new page (update the path as per your project)
        window.location.href = "../Index/index.html";
    } catch (error) {
        console.error("Error signing in:", error);
        alert("Error: " + error.message);
    }
});

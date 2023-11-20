const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_-+={[}],|:;<>.?/";
let passUno = document.getElementById("pass1");
let passDuos = document.getElementById("pass2");
let inputElement = document.getElementById("input");


 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyB1JUWg4jOvVghD8Masi0dJAI1hhayZmLc",
   authDomain: "schproject-81e0b.firebaseapp.com",
   projectId: "schproject-81e0b",
   storageBucket: "schproject-81e0b.appspot.com",
   messagingSenderId: "453883692077",
   appId: "1:453883692077:web:76c351281815182717a4a4",
   measurementId: "G-275W0QFJD6"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);

// Initialize Firebase with your project config
firebase.initializeApp({
    apiKey: "AIzaSyB1JUWg4jOvVghD8Masi0dJAI1hhayZmLc",
    authDomain: "schproject-81e0b.firebaseapp.com",
    projectId: "schproject-81e0b",
    storageBucket: "schproject-81e0b.appspot.com",
    databaseURL: "https://console.firebase.google.com/u/0/project/schproject-81e0b/database/schproject-81e0b-default-rtdb/data/~2F"
  });

let generatedPasswords = [];
let database = firebase.database();

async function generatePass() {
    let password1 = "";
    let password2 = "";
    for (let i = 0; i < 16; i++) {
        let randomUno = Math.floor(Math.random() * characters.length);
        password1 += characters[randomUno];

        let randomDuos = Math.floor(Math.random() * characters.length);
        password2 += characters[randomDuos];
    }
    passUno.textContent = password1;
    passDuos.textContent = password2;

    generatedPasswords.push(password1, password2);

    // Save generated passwords to Firebase
    await database.ref('generatedPasswords').set(generatedPasswords);
}

async function validateInput() {
    let userInput = inputElement.value;
    const snapshot = await database.ref('generatedPasswords').once('value');
    const storedPasswords = snapshot.val() || [];

    if (storedPasswords.includes(userInput)) {
        alert("Software Key is valid!");
    } else {
        alert("Pirated software detected!");
    }
}

// Load generated passwords from Firebase on page load
database.ref('generatedPasswords').once('value').then(snapshot => {
    generatedPasswords = snapshot.val() || [];
    generatePass(); // Generate passwords after loading
});

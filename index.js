const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_-+={[}],|:;<>.?/";
let passUno = document.getElementById("pass1");
let passDuos = document.getElementById("pass2");
let inputElement = document.getElementById("input");

// Initialize Firebase with your project config
firebase.initializeApp({
    apiKey: "AIzaSyB1JUWg4jOvVghD8Masi0dJAI1hhayZmLc",
    authDomain: "schproject-81e0b.firebaseapp.com",
    projectId: "schproject-81e0b",
    storageBucket: "schproject-81e0b.appspot.com",
    databaseURL: "https://schproject-81e0b-default-rtdb.europe-west1.firebasedatabase.app"
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

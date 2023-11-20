const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_-+={[}],|:;<>.?/";
let passUno = document.getElementById("pass1");
let passDuos = document.getElementById("pass2");
let inputElement = document.getElementById("input");
let generatedPasswords = [];

// Function to generate passwords and store them in localStorage
function generatePass() {
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

    // Store generated passwords in localStorage
    generatedPasswords.push(password1);
    generatedPasswords.push(password2);
    localStorage.setItem("generatedPasswords", JSON.stringify(generatedPasswords));
}

// Function to validate user input
function validateInput() {
    let userInput = inputElement.value;
    // Retrieve generated passwords from localStorage
    let storedPasswords = JSON.parse(localStorage.getItem("generatedPasswords")) || [];

    if (storedPasswords.includes(userInput)) {
        alert("Software Key is valid!");
    } else {
        alert("Pirated software detected!");
    }
}

// Call the generatePass function
generatePass();

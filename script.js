let username;
let secretNumber;
let attempts = 0;
const maxAttempts = 10;
const leaderboard = [];

function login() {
    username = document.getElementById("username").value;
    document.getElementById("user").textContent = username;
    document.querySelector(".login").style.display = "none";
    document.querySelector(".game").style.display = "block";
    generateSecretNumber();
}

function generateSecretNumber() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
}

function checkGuess() {
    const guess = parseInt(document.getElementById("guess").value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        document.getElementById("message").textContent = "Enter a valid number between 1 and 100.";
        return;
    }

    attempts++;

    if (guess === secretNumber) {
        document.getElementById("message").textContent = `Congratulations, you guessed the number in ${attempts} attempts!`;
        leaderboard.push({ username, attempts });
        leaderboard.sort((a, b) => a.attempts - b.attempts);
        updateLeaderboard();
        resetGame();
    } else if (attempts >= maxAttempts) {
        document.getElementById("message").textContent = `Game over! The correct number was ${secretNumber}.`;
        resetGame();
    } else if (guess < secretNumber) {
        document.getElementById("message").textContent = "Try a higher number.";
    } else {
        document.getElementById("message").textContent = "Try a lower number.";
    }
}

function updateLeaderboard() {
    const leaderList = document.getElementById("leaderList");
    leaderList.innerHTML = "";
    leaderboard.slice(0, 5).forEach((entry, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${entry.username} - ${entry.attempts} attempts`;
        leaderList.appendChild(li);
    });
}

function resetGame() {
    document.querySelector(".game").style.display = "none";
    document.querySelector(".login").style.display = "block";
    document.getElementById("username").value = "";
    document.getElementById("guess").value = "";
    document.getElementById("message").textContent = "";
    attempts = 0;
}

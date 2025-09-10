let currentMoney = 10000;  // Starting balance
let betType = "small";   // Default to small bet
let guessNumber = -1;    // Default guess is invalid
let betAmount = 10,100,1000,10000;       // Bet amount

// This function simulates spinning the slot machine
function spinSlot() {
    // Generate a random number between 0 and 9
    const randomNumber = Math.floor(Math.random() * 10);  // 0 to 9

    // Update the slot machine display
    document.getElementById('slot').textContent = randomNumber;

    // Check if the player's bet is correct
    let winAmount = 10=10,100=100,1000=1000;

    // Check if the player's bet matches the "Big" or "Small" prediction
    let isBig = randomNumber >= 5;  // Big number: 5-9
    let isSmall = randomNumber <= 4; // Small number: 0-4

    if ((betType === "big" && isBig) || (betType === "small" && isSmall)) {
        // Bet on the right "Big" or "Small"
        if (randomNumber === guessNumber) {
            // The player guessed the number right
            winAmount = betAmount * 5; // High reward for correct guess
            currentMoney += winAmount;
            document.getElementById('statusMessage').textContent = `You win! You guessed the number ${randomNumber} correctly and earned $${winAmount}.`;
        } else {
            // The player guessed Big/Small correctly, but number was wrong
            winAmount = betAmount * 1.5; // Small reward for Big/Small guess
            currentMoney += winAmount;
            document.getElementById('statusMessage').textContent = `You guessed the right range (Big/Small)! You earned $${winAmount}.`;
        }
    } else {
        document.getElementById('statusMessage').textContent = 'Sorry, try again!';
    }

    // Update the balance display
    updateBalance();
}

// Update the balance display
function updateBalance() {
    document.getElementById('balance').textContent = currentMoney;
}

// Set bet type to small
function setSmallBet() {
    betType = "small";
    alert("You have selected Small Bet! (0-4)");
}

// Set bet type to big
function setBigBet() {
    betType = "big";
    alert("You have selected Big Bet! (5-9)");
}

// Get the bet amount from the input
function getBetAmount() {
    const betAmountInput = document.getElementById('betAmount');
    const betAmount = parseInt(betAmountInput.value);
    return isNaN(betAmount) || betAmount <= 0 || betAmount > currentMoney ? 0 : betAmount;
}

// Start the slot machine game with the user's bet
function startSlot() {
    // Get the player's bet and guess
    betAmount = parseInt(document.getElementById('betAmount').value);
    guessNumber = parseInt(document.getElementById('guessNumber').value);

    if (isNaN(guessNumber) || guessNumber < 0 || guessNumber > 9) {
        alert("Please enter a valid guess between 0 and 9.");
        return;
    }

    if (betAmount <= 0 || betAmount > currentMoney) {
        alert("Please enter a valid bet amount.");
        return;
    }

    // Subtract the bet amount from the balance
    currentMoney -= betAmount;
    updateBalance();

    // Spin the slots and check if the player won
    spinSlot();
}
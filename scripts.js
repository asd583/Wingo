let playerBalance = 100; // Initial balance for the player
let betAmount = 1; // Default bet value

// Event listener for the spin button
document.getElementById('spinButton').addEventListener('click', spin);

// Event listeners for admin controls
document.getElementById('addCurrency').addEventListener('click', addCurrency);
document.getElementById('subtractCurrency').addEventListener('click', subtractCurrency);

// Symbol list for the slot machine
const symbols = ["🍒", "🍇", "🍉", "🍊", "🍓", "🍋"];

// Admin function to add currency
function addCurrency() {
    const adminAmount = parseInt(document.getElementById('adminAmount').value);
    playerBalance += adminAmount;  // Add to player's balance
    updateBalance();  // Update balance display
}

// Admin function to subtract currency
function subtractCurrency() {
    const adminAmount = parseInt(document.getElementById('adminAmount').value);
    if (playerBalance - adminAmount >= 0) {
        playerBalance -= adminAmount;  // Subtract from player's balance
        updateBalance();  // Update balance display
    } else {
        alert("Not enough balance to subtract!");
    }
}

// Function to spin the slot machine
function spin() {
    // Get the bet value from input field
    betAmount = parseInt(document.getElementById('bet').value);

    // Check if the player has enough balance to place the bet
    if (betAmount > playerBalance) {
        document.getElementById('result').textContent = "Not enough balance! Please lower your bet.";
        return;
    }

    // Deduct the bet amount from the player's balance
    playerBalance -= betAmount;
    updateBalance();

    // Randomly pick symbols for each reel
    const reel1 = randomSymbol();
    const reel2 = randomSymbol();
    const reel3 = randomSymbol();

    // Display the symbols in the reels
    document.getElementById('reel1').querySelector('.symbol').textContent = reel1;
    document.getElementById('reel2').querySelector('.symbol').textContent = reel2;
    document.getElementById('reel3').querySelector('.symbol').textContent = reel3;

    // Check for win
    const result = checkWin(reel1, reel2, reel3);
    if (result) {
        // Add winnings to player's balance if they win
        playerBalance += betAmount * 2;  // Example: winning doubles the bet
        updateBalance();
        document.getElementById('result').textContent = `You win! You got ${reel1}${reel2}${reel3}. Your new balance is ${playerBalance} coins.`;
    } else {
        document.getElementById('result').textContent = `You lose! Try again. Your balance is ${playerBalance} coins.`;
    }
}

// Function to randomly pick a symbol
function randomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Function to check if the player has won
function checkWin(symbol1, symbol2, symbol3) {
    return symbol1 === symbol2 && symbol2 === symbol3;  // Win if all symbols are the same
}

// Update the balance display
function updateBalance() {
    document.getElementById('playerBalance').textContent = playerBalance;
}
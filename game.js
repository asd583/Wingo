let balance = 100;
let symbols = ['🍀', '💎', '🦁', '🍉', '💰']; // Slot symbols

// Elements
const reels = document.getElementById('reels');
const spinButton = document.getElementById('spin');
const resultDisplay = document.getElementById('result');
const balanceDisplay = document.getElementById('user-balance');

// Function to spin the reels
function spinReels() {
    // Disable the spin button during the spin
    spinButton.disabled = true;

    // Randomly generate the spin result
    let spinResult = [];
    for (let i = 0; i < 6; i++) { // 6 reels
        spinResult.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }

    // Display the reels on the screen
    reels.innerHTML = '';
    spinResult.forEach(symbol => {
        const reel = document.createElement('div');
        reel.textContent = symbol;
        reels.appendChild(reel);
    });

    // Simulate a win (for demo purposes)
    setTimeout(() => {
        let win = spinResult.some(symbol => symbol === '🦁');
        if (win) {
            balance += 10; // Increase balance if win
            resultDisplay.textContent = 'You win $10!';
        } else {
            balance -= 10; // Deduct balance if no win
            resultDisplay.textContent = 'You lose $10.';
        }

        // Update the balance and re-enable the spin button
        balanceDisplay.textContent = `Balance: $${balance}`;
        spinButton.disabled = false;
    }, 1500);
}

// Add event listener for the spin button
spinButton.addEventListener('click', spinReels);

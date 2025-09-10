I'mlet balance = 100;
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

const apiUrl = 'http://localhost:3000'; https://opencollective.com/express // Backend API URL

// Login API call
async function login(username) {
    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });
    const data = await response.json();
    if (data.message === 'Login successful') {
        balance = data.balance;
        balanceDisplay.textContent = `Balance: $${balance}`;
    } else {
        alert('Login failed');
    }
}

// Spin API call
async function spin() {
    const response = await fetch(`${apiUrl}/spin`, {
        method: 'POST

const apiUrl = 'http://localhost:3000';https://opencollective.com/express  // Backend API URL

// Elements
const loginButton = document.getElementById('login'); // Login button (you can add a login input form for username)
const logoutButton = document.getElementById('logout');
const usernameInput = document.getElementById('username-input'); // Input field for username

// Login function
async function login(username) {
    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });

    const data = await response.json();

    if (data.message === 'Login successful') {
        balance = data.balance;
        balanceDisplay.textContent = `Balance: $${balance}`;
        usernameInput.disabled = true;  // Disable the username input field after successful login
        loginButton.disabled = true;  // Disable the login button
        logoutButton.disabled = false; // Enable the logout button
    } else {
        alert('Login failed');
    }
}

// Logout function
function logout() {
    usernameInput.disabled = false;
    loginButton.disabled = false;
    logoutButton.disabled = true;
    balance = 100; // Reset balance for demo purposes
    balanceDisplay.textContent = `Balance: $${balance}`;
}

// Listen for login button click
loginButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        login(username);
    } else {
        alert('Please enter a username.');
    }
});

// Listen for logout button click
logoutButton.addEventListener('click', logout);
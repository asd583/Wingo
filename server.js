const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Sample database (for demo purposes)
let users = {
    user1: { username: 'user1', balance: 100 },
};

// API Endpoint to handle user login
app.post('/login', (req, res) => {
    const { username } = req.body;
    if (users[username]) {
        return res.json({ message: 'Login successful', balance: users[username].balance });
    } else {
        return res.status(404).json({ message: 'User not found' });
    }
});

// API Endpoint to handle spins
app.post('/spin', (req, res) => {
    const { username } = req.body;
    if (!users[username]) return res.status(404).json({ message: 'User not found' });

    // Simulate a spin and update balance
    const spinResult = Math.random() < 0.5 ? 'win' : 'lose';
    let payout = 0;
    if (spinResult === 'win') {
        payout = 10; // Payout on win
        users[username].balance += payout;
    } else {
        payout = -10; // Deduct on loss
        users[username].balance += payout;
    }

    res.json({ message: `You ${spinResult}!`, balance: users[username].balance });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


// Admin endpoint to view all users and their balances
app.get('/admin/users', (req, res) => {
    res.json(users);
});

// Admin endpoint to reset a user's balance
app.post('/admin/reset-balance', (req, res) => {
    const { username } = req.body;
    if (users[username]) {
        users[username].balance = 100; // Reset balance to $100
        res.json({ message: `Balance for ${username} has been reset.`, balance: users[username].balance });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Admin endpoint to view all users and their balances
app.get('/admin/users', (req, res) => {
    res.json(users);
});

// Admin endpoint to reset a user's balance
app.post('/admin/reset-balance', (req, res) => {
    const { username } = req.body;
    if (users[username]) {
        users[username].balance = 100; // Reset balance to $100
        res.json({ message: `Balance for ${username} has been reset.`, balance: users[username].balance });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
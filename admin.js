const apiUrl = 'http://localhost:3000';https://opencollective.com/express // Backend URL

// Fetch and display users
async function fetchUsers() {
    const response = await fetch(`${apiUrl}/admin/users`);
    const data = await response.json();
    const userList = document.getElementById('user-list');
    
    userList.innerHTML = '';
    data.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.username} - Balance: $${user.balance}`;
        userList.appendChild(listItem);
    });
}

// Reset user balance
async function resetBalance() {
    const username = document.getElementById('username-reset').value.trim();
    if (!username) {
        alert('Please enter a username.');
        return;
    }

    const response = await fetch(`${apiUrl}/admin/reset-balance`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });

    const data = await response.json();
    alert(data.message);

    fetchUsers(); // Refresh user list
}

// Fetch users on page load
window.onload = fetchUsers;

// Listen for reset balance button click
document.getElementById('reset-balance-btn').addEventListener('click', resetBalance);
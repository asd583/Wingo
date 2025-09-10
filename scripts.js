let adminPassword = 'admin123';

app.post('/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === adminPassword) {
        res.json({ message: 'Admin logged in successfully' });
    } else {
        res.status(401).json({ message: 'Invalid password' });
    }
});

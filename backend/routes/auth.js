const express = require('express');
const router = express.Router();

// Signup Route
router.post('/signup', (req, res) => {
    const { fullname, email, password, confirm_password } = req.body;

    if (!fullname || !email || !password || !confirm_password) {
        return res.status(400).json({ message: 'All fields required' });
    }
    if (password !== confirm_password) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    res.redirect('/index.html');
});

// Login Route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
    }

    res.redirect('/index.html');
});

// Forget Password Route
router.post('/forget-password', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    res.redirect('/index.html');
});

module.exports = router;

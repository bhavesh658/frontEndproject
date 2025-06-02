const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 5000;

// Middleware (add these BEFORE routes)
app.use(cors());
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json()); // for JSON data

// Routes
app.use('/', authRoutes); // adjust path if your form posts to /signup

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/bookmyplanner', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // or your frontend file
});

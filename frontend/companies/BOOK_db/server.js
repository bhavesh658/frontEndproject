const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://ayushchoyal07:GoB5jFeMRsmd82tz@book.pmhaffk.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Booking model
const bookingSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobile: String,
  address: {
    houseNumber: String,
    street: String,
    locality: String,
    city: String,
    district: String,
    pincode: String,
    state: String
  },
  bookingDate: { type: Date, required: true, unique: true },
  amount: Number,
  plan: String
});

const Booking = mongoose.model('Booking', bookingSchema);

// Routes

// Get already booked dates
app.get('/booked-dates', async (req, res) => {
  try {
    const bookings = await Booking.find({}, 'bookingDate');
    const bookedDates = bookings.map(b => b.bookingDate.toISOString().split('T')[0]);
    res.json(bookedDates);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching booked dates");
  }
});

// Create booking (when user clicks Book Now)
app.post('/create-order', async (req, res) => {
  try {
    const {
      fullName, email, mobile, address,
      bookingDate, amount, plan
    } = req.body;

    // Check if date already booked
    const existingBooking = await Booking.findOne({ bookingDate: new Date(bookingDate) });
    if (existingBooking) {
      return res.status(400).json({ error: "Date already booked" });
    }

    // Save booking
    const newBooking = new Booking({
      fullName,
      email,
      mobile,
      address,
      bookingDate: new Date(bookingDate),
      amount,
      plan
    });

    await newBooking.save();

    res.json({ success: true, message: "Booking created successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating booking");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

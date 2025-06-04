// backend/server.js

const Razorpay = require("razorpay");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
});

app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // in paise
      currency: "INR",
      receipt: "receipt_order_74394",
      payment_capture: 1
    };

    const response = await razorpay.orders.create(options);
    res.json(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});

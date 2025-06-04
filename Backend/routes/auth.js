const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// JWT Secret (Use environment variable in real apps)
//const JWT_SECRET = 'your_jwt_secret_key';
require('dotenv').config();
// const JWT_SECRET = process.env.JWT_SECRET;


router.post('/signup',async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        let user = await User.findOne({email});
        if(user)return res.status(400).json({msg: `User already exists`});

        user=new User({name,email,password});

        const salt= await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);

        await user.save();
            // Return JWT token
         const payload = { userId: user.id };
         const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

          res.status(201).json({ token });
        } catch (err) {
             console.error(err.message);
             res.status(500).send('Server error');
    }
});
router.post('/signin', async (req, res) => {
  const { name, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Return JWT token
    const payload = { userId: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.get('/test', (req, res) => {
    res.send("Signup route working!");
});

module.exports = router;

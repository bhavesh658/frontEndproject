const express= require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const app = express();


// const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use('/api/auth', authRoutes);

app.get('/',(req,res)=>{
    res.send('API Running')
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
require('dotenv').config();
const connectDB = require('./db');


const authRoutes = require('./routes/auth');



const app = express();



const PORT = 3000 || process.env.PORT;


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

connectDB();
app.use('/auth', authRoutes);

app.use(bodyParser.json());
app.use(cors());

app.get('/api',(req,res)=>{
    res.send('API Running')
});



app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})
   
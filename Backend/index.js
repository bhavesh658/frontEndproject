const express= require('express');
const connectDB = require('./db');
const bodyParser = require('body-parser'); 

const authRoutes = require('./routes/auth');

const cors = require('cors');

require('dotenv').config();


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
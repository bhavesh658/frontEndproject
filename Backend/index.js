const express= require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const cors = require('cors');


require('dotenv').config();
const app = express();
app.use(cors({
      origin: 'http://192.168.162.47:3000',  // frontend origin URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // methods allowed
  credentials: true,  // if you need cookies/auth headers
}));


const JWT_SECRET = process.env.JWT_SECRET || "addfcidskfjfkjdkhkljoladfjoasdjklj";

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
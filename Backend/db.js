const mongoose = require('mongoose');
const connectDB= async ()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/BookMyPlanner',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected successfully....`);
    }catch(err){
        console.error(`MongoDB Connection Failed:`,err.message);
        process.exit(1);
    }
};

module.exports=connectDB;
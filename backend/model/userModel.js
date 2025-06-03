const {Schema,model}=require("mongoose");
const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        maxlength:50
    },
    age:{
        type:Number,
        required: true
    },
    weight:{
        type: Number,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});
const userModel = model("user",userSchema)
module.exports=userModel
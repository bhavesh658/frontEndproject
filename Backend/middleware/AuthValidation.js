const Joi = require('joi');
const signupValidation = (req,res,next)=>{
    const Schema=Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().required(),
        password: Joi.string().min(4).max(30).required()

    });
   const { error } = Schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            error: error.details.map(err => err.message)
        });
    }
    
    next();
}
const signinValidation = (req,res,next)=>{
    const Schema=Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(4).max(30).required()

    });
    const {error}=Schema.validate(req.body);
    if(error){
        return res.status(400).json({message: "Bad reuest",error})
    }
    
    next();
}
module.exports={
    signinValidation,
    signupValidation
}


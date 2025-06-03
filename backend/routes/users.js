// users.js (routes/users.js)
import express from "express";
import User from "../model/userModel.js"; // ✅ use .js extension in ES modules

const router = express.Router();

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// POST create new user
router.post('/users', async (req, res) => {
  try {
    const { name, age, weight } = req.body;
    const user = new User({ name, age, weight });
    await user.save(); // ✅ correct save method

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
});
router.post('/user/:id',async(req,res)=>{
    const {id}=req.body;
    const {name,age,weight}=req.body;
    try{
        const updateuser=user.findByidAndUpdate(id,{name,age,weight})
        if(!updatedUser){
            res.json({
                message:"user not found"
            })
        }
        res.status(200).json({
            success: true,
            user: updatedUser
        })

    } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
})


export default router; // ✅ proper ES module export

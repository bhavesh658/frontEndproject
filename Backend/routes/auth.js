const express = require("express");
const router = express.Router();
const { signupValidation, signinValidation } = require("../middleware/AuthValidation");
const { signup, signin } = require("../controller/AuthController");

router.post('/signup',signupValidation,signup);
router.post('/signin',signinValidation,signin);

module.exports = router;

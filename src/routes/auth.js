const express = require("express")
const router = express.Router()

const { signup, signin, signout, requireSignin, isLibrarian } = require("../controllers/auth");
const { userSignupValidator, userSigninValidator } = require('../validator/index');

router.post("/signup",requireSignin,isLibrarian,userSignupValidator, signup ); 
router.post("/signin",userSigninValidator, signin);
router.get("/signout", signout);


module.exports = router;
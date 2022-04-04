const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isLibrarian, isUser } = require("../controllers/auth");
const { userById, read, update, listUsers, remove} = require("../controllers/user");

//Read a user
router.get("/user/:userId", requireSignin, isAuth, read);

//Admin list user
router.get("/admin/user/listuser", requireSignin, isLibrarian, listUsers);

//Admin delete a user
router.delete("/delete/:userId", requireSignin, remove);



//user update their info
router.put("/user/:userId", requireSignin, isAuth, update);



router.param("userId", userById);

module.exports = router;
const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isLibrarian, isUser } = require("../controllers/auth");
const { userById, read, update, listUsers, remove, setLibrarian, setMember} = require("../controllers/user");

//Read a user
router.get("/user/:userId", requireSignin, isAuth, read);

//Admin list user
router.get("/admin/listuser", requireSignin, isLibrarian, listUsers);

//Admin delete a user
router.delete("admin/delete/:userId", requireSignin, remove);

//User delete their own
router.delete("/user/delete/:userId", requireSignin, isUser, remove);

//user update their info
router.put("/user/:userId", requireSignin, isAuth, update);

//admin can set role for user
router.put("/role/librarian/:userId", requireSignin, isLibrarian, setLibrarian);
router.put("/role/member/:userId", requireSignin, isLibrarian, setMember);


router.param("userId", userById);

module.exports = router;
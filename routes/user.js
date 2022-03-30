const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isLi, isLibrarian} = require('../controllers/auth');

const { userById, read, listUsers } = require('../controllers/user');

router.get('/secret/:userId', requireSignin, isAuth, isLibrarian, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.get('/user/:userId', requireSignin, isAuth, read);
router.get("/admin/listuser", requireSignin, isLibrarian, listUsers);
router.param('userId', userById);

module.exports = router;
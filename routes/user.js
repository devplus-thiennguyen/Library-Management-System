const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isLibrarian} = require('../controllers/auth');

const { userById, read, update, listUsers, updaterole,remove } = require('../controllers/user');

router.get('/secret/:userId', requireSignin, isAuth, isLibrarian, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.get("/admin/listuser", requireSignin, isLibrarian, listUsers);
router.get('/user/:userId', requireSignin, isAuth, read);

router.put('/user/:userId', requireSignin,isAuth, update);
router.put('/admin/:userId', requireSignin, isLibrarian, updaterole);
router.delete('/admin/user/:userId', requireSignin, isLibrarian, remove);

router.param('userId', userById);

module.exports = router;
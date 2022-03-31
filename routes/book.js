const router = require('express').Router();
const { create_book, get_books } = require('../controllers/book');
const { requireSignin, isAuth, isLibrarian} = require('../controllers/auth');



// Create book
router.post('/admin/createbook', requireSignin, isLibrarian , create_book);


// Get all books
router.get('/listbook', get_books);
module.exports = router;
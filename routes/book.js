const router = require('express').Router();
const { create_book, get_books,update_book, remove_book, borrow_book, available_book } = require('../controllers/book');
const { requireSignin, isAuth, isLibrarian} = require('../controllers/auth');



// Create book
router.post('/admin/createbook', requireSignin, isLibrarian , create_book);


// Get all books
router.get('/listbook', get_books);

// Update book
router.put('/admin/book/:id', requireSignin, isLibrarian, update_book);

// Update status book
router.patch("/book/borrow/:id", requireSignin, borrow_book);
router.patch("/book/available/:id", requireSignin, available_book);

//Delete book
router.delete('/admin/book/:id', requireSignin, isLibrarian, remove_book);
module.exports = router;
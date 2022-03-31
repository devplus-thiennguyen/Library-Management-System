const router = require('express').Router();
const { create_book } = require('../controllers/book');


// Create book
router.post('/admin/createbook', create_book);

module.exports = router;
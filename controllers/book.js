const Book = require('../models/Book');

// Create book
exports.create_book = async (req, res) => {
    await Book.create({
        title: req.body.title,
        author: req.body.author,
    }, (err, book) => {
        if (err) return res.status(500).json({success: false, message: err.message});
        res.status(200).json({success: true, book});
    });
};

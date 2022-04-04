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

// Get all books
exports.get_books = async (req, res) => {
    await Book.find()
        .then(books => {
            res.status(200).json({success: true, count: books.length, books});
        })
        .catch(err => {
            res.status(500).json({success: false, message: err.message});
        });
};

//Update book
exports.update_book = async (req, res) => {
    await Book.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false})
        .then(book => {
            res.status(200).json({success: true,message: "The book has been updated", book});
        })
        .catch(err => {
            res.status(500).json({success: false, message: err.message});
        });
};

//Delete book
exports.remove_book = async (req, res) => {
    await Book.findByIdAndDelete(req.params.id)
        .then(book => {
            res.status(200).json({success: true, message: "The book has been deleted"});
        })
        .catch(err => {
            res.status(500).json({success: false, message: err.message});
        });
    };

// Get book by id
exports.get_book = async (req, res) => {
   await Book.findOne({ _id: req.params.id })
      .then((book) => {
         res.status(200).json({ success: true, book });
      })
      .catch((err) => {
         res.status(500).json({ success: false, message: err.message });
      });
};

// Borrow book

exports.borrow_book = async (req, res) => {
   await Book.findByIdAndUpdate(req.params.id, {
      status: "BORROWED",
   })
      .then((book) => {
         res.status(200).json({
            success: true,
            message: "Status book has been change BORROWED",
         });
      })
      .catch((err) => {
         res.status(500).json({ success: false, message: err.message });
      });
};
// Returned book

exports.available_book = async (req, res) => {
   await Book.findByIdAndUpdate(req.params.id, {
      status: "AVAILABLE",
   })

      .then((book) => {
         res.status(200).json({
            success: true,
            message: "Status book has been change AVAILABLE",
         });
      })
      .catch((err) => {
         res.status(500).json({ success: false, message: err.message });
      });
};
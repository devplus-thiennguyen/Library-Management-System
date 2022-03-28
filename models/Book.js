const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: String,
    genre: String,
    author: [{type: mongoose.Schema.Types.ObjectId,ref:'Author'}]
});

exports.Book=mongoose.model('Book',bookSchema);
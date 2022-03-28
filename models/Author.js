const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    name:{type:String,default:'name'} ,
    age:{type:Number,default:0}
});


exports.Author = mongoose.model('Author', authorSchema);
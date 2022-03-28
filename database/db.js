const mongoose = require("mongoose");
const DB = process.env.DATABASE;
const dotenv = require("dotenv");

dotenv.config();
// Connecting mongoDB Database
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log("Database is sucessfully connected!");
}).catch(error => {
  console.log("Could not connect to database : " + error);
});
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();

// import routes
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/user');



// app
const app = express();

// db
mongoose
.connect(`mongodb+srv://vanquy1306:quypv1306@crudapp.s69oc.mongodb.net/Rentbook?retryWrites=true&w=majority
`,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   dbName: 'book'

})
.then(() => console.log("DB is Connected")
)
.catch(err=>{
    console.log(`db error ${err.message}`);
    process.exit(-1)
});
// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);

// Production
var server = app.listen(process.env.PORT || 3000 , function () {
    var port = server.address().port;
    console.log(`Server is running on port ${port}`)
});
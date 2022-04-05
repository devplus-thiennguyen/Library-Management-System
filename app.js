const express = require('express');

const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config({
    path: ".env"
});


// Routers
const apiRouter = require('./routes/api');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log('Connected to database')
    })
    .catch(err => {
        console.log(err);
    });

const app = express();

// Routes

app.use(cors({origin: 'http://localhost:8080', credentials: true}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.use('/', apiRouter);


module.exports = app;
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const session = require('express-session');
require('dotenv').config();


// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


// app
const app = express();

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'huuthien',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
// db
mongoose
.connect(`mongodb+srv://admin:admin123@server.kpngk.mongodb.net/student?retryWrites=true&w=majority`,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   dbName: 'library'

})
.then(() => console.log("DB Connected")
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
var server = app.listen(process.env.PORT || 3000 , function () {
    var port = server.address().port;
    console.log(`Server is running on port ${port}`)
});
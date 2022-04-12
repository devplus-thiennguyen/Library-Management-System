const User = require('../models/user')
const jwt = require('jsonwebtoken'); 
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { body } = require("express-validator/check");
const { token } = require("morgan");

exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
if(err) {
    return res.status(400).json({
        err: errorHandler(err)
    });
}
user.salt = undefined
user.hashed_password = undefined
res.json({
    user
});
    });
};

exports.signin = (req, res) => {
    // find the user based on email
    const {email, password} = req.body
    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: "User with that email does not exist. Please become a member"
            });
        }

// create authenticate method in user model
if(!user.authenticate(password)) {
    return res.status(401).json({
        error: "Account information invalid"
    });
}
    const newUser = {
        ...user._doc,
    }
    delete newUser.hashed_password;
    req.session.user = newUser;

//generate a signed token with user id and secret
const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

// persist the token as 't' in coolie with expiry date
res.cookie('t', token, {expire: new Date() + 9999})

// return response with user and token t frontend client               
const {_id, name, email, role} = user
return res.json({token, user: {_id, email, name, role}})
    });
};


exports.signout = (_req, res) => {
    res.clearCookie('t')
    res.json({
        message: "Signout Successfully"
    });
};

exports.requireSignin = (req, res, next) => {
    const tokenSignin = req.header("Authorization");
    if (!tokenSignin) {
       return res.status(403).json({
          error: "Unauthorized access! Please sign in to the respective account",
       });
    }
    const token = req.cookies.t;
    if (tokenSignin !== token)
       return res.status(403).json({ error: "Invalid token!" });
 
    next();
 };

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user) {
        return res.status(403).json({
            error: "Access denied!"
        });
    }
    next();
};

exports.isLibrarian = (req, res, next) => {
    try {
        const isUserRole = req.session.user.role;

        if(isUserRole !== "Librarian") {
            return res.status(403).json({
                message: 'unauthorized librarian'
            });
        }
        return next();
    } catch (error) {
        return next(error)
    }
};

exports.isUser = (req, res, next) => {
    try {
       let isUser = req.session.user._id == req.params.userId;
       if (!isUser) {
          return res.status(403).json({
             message: "unauthorize user! You are not allowed to do that.",
          });
       }
       return next();
    } catch (error) {
       return next(error);
    }
 };


 exports.DupeLibrarian = async (req, res, next) => {
    try {
       let DupeLib = req.user.role == "librarian";
       console.log(isLib, "role");
       if (DupeLib) {
          return res.status(403).json({
             message: "This user is already a librarian",
          });
       }
       return next();
    } catch (error) {
       return next(error);
    }
 };

 exports.DupeLibrarian = async (req, res, next) => {
    try {
       let DupeLib = req.user.role == "Librarian";
       console.log(isLib, "role");
       if (DupeLib) {
          return res.status(403).json({
             message: "This user is already a librarian",
          });
       }
       return next();
    } catch (error) {
       return next(error);
    }
 };

 
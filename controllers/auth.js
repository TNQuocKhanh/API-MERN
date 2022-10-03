const User = require('../models/UserModel');
const jwt = require('jsonwebtoken'); 
const expressJwt = require('express-jwt'); 
const mailer = require('../utils/mailer')

require('dotenv').config();

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    mailer.sendMail(req.body.email,'GreenFood','<p>Chúc mừng bạn đã đăng ký tài khoản thành công.</p>')
    console.log('==', user)
    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email doesn't exist. Please signup.",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password didn't match",
      });
    }
    const token = jwt.sign(
      { _id: user._id },
      process.env.SECRET
    );
    res.cookie('t', token, { expire: new Date() + 9999 });
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Signout success' });
};

exports.requireSignin = expressJwt({
  secret: process.env.SECRET,
  // algorithms: ['RS256'],
  userProperty: 'auth',
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: 'Access denied',
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.body.role === 0) {
    return res.status(403).json({
      error: 'Admin resource! Access denied',
    });
  }
  next();
};


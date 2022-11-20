const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const mailer = require('../utils/mailer');
const passport = require('passport');
const _ = require('lodash');

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
    mailer.sendMail(
      req.body.email,
      'HDKMart',
      '<p>Click <a href="' +
        process.env.AUTH_CLIENT_URL +
        'verify/' +
        user._id +
        '">tại đây</a> để hoàn tất đăng ký.</p>'
    );
    res.json({
      user,
    });
  });
};

exports.verifyUser = (req, res) => {
  const userId = req.params.id;

  updateVerifyUser(userId);

  res.status(200).json({ message: 'Xác thực thành công' });
};

const updateVerifyUser = async (id) => {
  const user = await User.findById(id);

  user.verify = true;

  await user.save();
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: "User with that email doesn't exist. Please signup.",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password didn't match",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: '4h',
    });

     if (user.status === 0 || !user.verify) {
      return res.status(400).json({
        error: 'User was blocked',
        code: 'BLOCK',
      });
    }

    const dataToSave = _.omit(user.toJSON(), ['hashed_password', 'salt']);

    res.cookie('t', token, { expire: new Date() + 9999 });
    return res.json({ token, user: dataToSave });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Signout success' });
};

exports.requireSignin = expressJwt({
  secret: process.env.SECRET,
  userProperty: 'auth',
});

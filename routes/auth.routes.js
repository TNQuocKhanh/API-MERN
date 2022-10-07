const express = require('express');
const router = express.Router();
const passport = require('passport')

const {
  signup,
  signin,
  signout,
} = require('../controllers/auth');


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}))

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/home')
  }
)

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;


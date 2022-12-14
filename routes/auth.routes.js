const express = require('express');
const router = express.Router();

const { signup, signin, signout, verifyUser } = require('../controllers/auth');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.get('/verify/:id', verifyUser);

module.exports = router;

require('../../models/User');

const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/users"
  })
});

/* POST users create listing. */
router.post('/register', async (req, res) => {
  const user = await User.findOne({
    $or: [{email: req.body.email}, {username: req.body.username}]
  })

  if (user) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "An account is already associated with this email"
    }
    if (user.username === req.body.username) {
      errors.username = "Sorry, this username is already taken"
    }
    err.errors = errors;
    return next(err);
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email
  })

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async(err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json({ user })
      }
      catch(err) {
        next(err);
      }
    })
  })
})

/* POST users Login listening */
router.post('/login', async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json({ user });
  }) (req, res, next);
})



module.exports = router;

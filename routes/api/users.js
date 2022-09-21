require('../../models/User');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const { restoreUser } = require('../../config/passport')
const { requireUser } = require('../../config/passport')

const mongoose = require('mongoose');
const passport = require('passport');
const { isProduction } = require('../../config/keys');
const User = mongoose.model('User');

const { loginUser } = require('../../config/passport')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/users"
  })
});

/* POST users create listing. */
router.post('/register', validateRegisterInput, async (req, res, next) => {
  const user = await User.findOne({
    $or: [{email: req.body.email}, {username: req.body.username}]
  })

  if (user) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "An account is already associated with this email."
    }
    if (user.username === req.body.username) {
      errors.username = "Sorry, this username is already taken."
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
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  })
})

/* POST users Login listening */
router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials.');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials." };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
})

/* GET current user listening */
router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email
  })
})

/* PATCH current user listening */
router.patch('/:userId', validateRegisterInput, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
  
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
    }
    if (req.body.password) {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
          if (err) throw err;
          try {
            user.hashedPassword = hashedPassword;
            const updatedUser = await user.save();
            // return res.json(await loginUser(updatedUser));
          }
          catch(err) {
            next(err);
          }
        })
      });
    }
    return res.json(user);

  }
  catch(err) {
    next(err)
  }
});

router.delete('/:userId', async (req, res) => {
  User
  .findByIdAndRemove(req.params.userId)
  .exec()
  .then(data => {
    if (!data) {return res.status(404).end(); }
    return res.status(204).end();
  })
  .catch(err => next(err))
});




module.exports = router;

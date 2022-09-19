const jwt = require('jsonwebtoken');
const { secretOrKey } = require('./keys');
require('./../models/User');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({
    session: false,
    useernameField: 'email',
    passwordField: 'password',
}, async function (email, password, done) {
    const user = await User.findOne({email});
    if (user) {
        bcrypt.compare(password, user.hashedPassword, (erer, isMatch) => {
            if (err || !isMatch) done (null, false);
            else done(null, user);
        })
    } else done(null, false);
}));

exports.loginUser = async function(user) {
    const userInfo = {
        _id: user._id,
        username: user.username,
        email: user.email
    };
    const token = await jwt.sign(
        userInfo,
        secretOrKey,
        { expiresIn: 3600 }
    );
    return {
        user: userInfo,
        token
    }
}

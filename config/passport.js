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

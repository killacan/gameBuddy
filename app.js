const passport = require('passport');
require('./config/passport');
// require ('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const debug = require('debug');
const cors = require('cors');
const csrf = require('csurf');

require('./models/User.js');
require('./models/Room.js');
require('./models/Review.js');
const path = require('path');

const usersRouter = require('./routes/api/users');
const csrfRouter = require('./routes/api/csrf');
const roomsRouter = require('./routes/api/rooms');
const reviewsRouter = require('./routes/api/reviews');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const { isProduction } = require('./config/keys')

app.use(passport.initialize());


app.use(
    csrf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
)

app.use('/api/users', usersRouter);
app.use('/api/csrf', csrfRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/reviews', reviewsRouter);

if (isProduction) {
    const path = require('path');
    // Serve the frontend's index.html file at the root route
    app.get('/', (req, res) => {
      res.cookie('CSRF-TOKEN', req.csrfToken());
      res.sendFile(
        path.resolve(__dirname, './frontend', 'build', 'index.html')
      );
    });
    
      // Serve the static assets in the frontend's build folder
  app.use(express.static(path.resolve("./frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  app.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('CSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, './frontend', 'build', 'index.html')
    );
  });
}

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
})

const serverErrorLogger = debug('backend:error');

app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500
    res.status(statusCode);
    res.json({
        message: err.message,
        statusCode,
        errors: err.errors
    })
})


module.exports = app;

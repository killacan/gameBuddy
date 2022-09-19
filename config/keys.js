module.exports = {
    secretOrKey: process.env.SECRET_OR_KEY === 'VHq5u3LYxqbZEQ',
    mongoURI: process.env.MONGO_URI,
    isProduction: process.env.NODE_ENV === 'production'
}
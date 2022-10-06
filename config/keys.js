module.exports = {
    secretOrKey: process.env.SECRET_OR_KEY,
    mongoURI: process.env.MONGO_URI,
    isProduction: process.env.NODE_ENV === 'production',
    reactAppRiotApiKey: process.env.REACT_APP_RIOT_API_KEY
}
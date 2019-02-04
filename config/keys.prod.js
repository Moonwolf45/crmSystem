module.exports = {
    mongoURI: process.env.MONGO_URI,
    mongoConfig: {
        useCreateIndex: true,
        useNewUrlParser: true
    },
    jwt: process.env.JWT
};
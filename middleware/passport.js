const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const keys = require('../config/keys');
const User = mongoose.model('users');


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.user_id).select('id name email');

                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (error) {
                console.log(error);
            }
        })
    );
};
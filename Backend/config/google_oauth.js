const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4500/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      let user = {
        name: profile._json.name,
        email: profile._json.email,
        password: uuidv4(),
        avtar: profile._json.picture,
      };
      console.log(user);
      return cb(null, user);
    }
  )
);

module.exports = passport;

const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4500/user/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile);

      let user = {
        full_name: profile._json.name,
        email: profile._json.email,
        password: uuidv4(),
        avatar: profile._json.picture,
      };
      console.log(user);
      return cb(null, user);
    }
  )
);

module.exports = { passport };

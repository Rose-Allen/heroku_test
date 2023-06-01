const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const keys = require("../config/keys");
const User = require("../models/User");

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
  User.findById(id).then((user) => {
    cb(null, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile ", profile);
      User.findOne({
        googleId: profile.id,
      }).then((userExist) => {
        if (userExist) {
          cb(null, userExist);
        } else {
          const user = new User({
            googleId: profile.id,
          });
          user.save().then((user) => {
            cb(null, user);
          });
        }
      });
    }
  )
);

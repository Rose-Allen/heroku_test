const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const authRoute = require("./routes/authRoutes");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

const app = express();

app.use(
  session({
    secret: keys.googleClientSecret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(keys.MONGO_URL);
const PORT = process.env.PORT || 5000;

authRoute(app);

app.get("/", (req, res) => {
  res.send("Main page");
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});

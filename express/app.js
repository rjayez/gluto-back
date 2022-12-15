let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let cookieSession = require("cookie-session");
let bodyParser = require("body-parser");
let logger = require("morgan");
// let bot = require("./bot/bot");
let helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const { CORS_OPTIONS } = require("./constants");

let indexRouter = require("./routes/index");
//let twitchRouter = require("./routes/twitch");
//let cardsRouter = require("./routes/cards");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Middlewares
app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({ secret: "coucou" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static("./public"));
// app.use(helmet());

app.use(cors(CORS_OPTIONS));
app.use("/", indexRouter);
//app.use("/twitch", twitchRouter);
//app.use("/cards", cardsRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

let passport = require("passport");
const session = require("express-session");
let twitchStrategy = require("passport-twitch-latest").Strategy;
// let { UsersService } = require("../src/users/users.service");

app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.set("trust proxy", 1); // trust first proxy

passport.use(
  "twitchStrategy",
  new twitchStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      // callbackURL: encodeURI("http://localhost:5000/auth/redirect"),
      callbackURL: encodeURI("https://gluto-back-staging.herokuapp.com/auth/redirect"),
      scope: "",
    },
    function (accessToken, refreshToken, profile, done) {
      // Suppose we are using mongo..
      console.info({ accessToken });
      console.info({ refreshToken });
      console.info({ profile });

      return done(null, { twitchId: 1 });

      // UsersService.findOrCreate({ twitchId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
    }
  )
);

passport.serializeUser(function (user, done) {
  console.info("serialize");
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.info("deserialize");
  done(null, user);
});

app.get("/", function (req, res) {
  res.render("index");
});

app.get(
  "/auth/twitch",
  passport.authenticate("twitchStrategy", {}, function (error, user, info) {
    console.info({ error });
    console.info({ user1: user });
    console.info({ info });
  })
);

app.get("/auth/redirect", passport.authenticate("twitchStrategy", { failureRedirect: "/" }), function (req, res) {
  res.redirect("/");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(process.env.PORT || 5000);

// module.exports = app;

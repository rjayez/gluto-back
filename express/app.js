let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let bot = require("./bot/bot");
let helmet = require("helmet");
const cors = require("cors");
const { CORS_OPTIONS } = require("./constants");

let indexRouter = require("./routes/index");
let twitchRouter = require("./routes/twitch");
let cardsRouter = require("./routes/cards");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());

app.use(cors(CORS_OPTIONS));
app.use("/", indexRouter);
app.use("/twitch", twitchRouter);
app.use("/cards", cardsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// start twitch bot
bot.connect().catch(console.error);

module.exports = app;

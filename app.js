var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var engine = require('ejs-locals');
var cors = require("cors");
var session = require('express-session');
var config = require("./config/index");
var passport = require("passport");

require("./config/connectDatabase");
require("./config/databaseSchema");

var app = express();
app.set("topSecretKey", config.serectKey);

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Adding cache css, js to improve page load
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '30 days' }));
app.set('Cache-Control', 'max-age=3000');
app.use('/favicon.ico', express.static('images/favicon.ico'));

// Adding cors to allow some domain
var whitelist = ["http://localhost:3000"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
// Set environment
app.set("env", "development");

if (app.get("env") === "production") {
  app.use(cors(corsOptions));
} else {
  app.use(logger("dev"));
  app.use(cors());
  require("./routes/setup")(app);
}

//express-session middleware
app.use(
  session({
    name: 'system_hsv_lan4',
    proxy: true,
    resave: true,
    secret: "system_hsv_lan4.secrect", // session secret
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false /*Use 'true' without setting up HTTPS will result in redirect errors*/,
    }
  })
);

//PassportJS middleware
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions

// connect to passport config
require('./config/passport')(passport);

// Adding authentication function
require("./routes/index")(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('notFound');
});

module.exports = app;

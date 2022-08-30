if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
require("./mongoDatabase.js");
require("./utility/error");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");
//const { fileURLToPath } = require "url";
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/AdminUsers");
const PORT = process.env.PORT || 5000;

// admin routes
const adminIndexRoutes = require("./routes/index");
const adminArticleRoutes = require("./routes/articles");
const adminProductRoutes = require("./routes/products");
const adminContactRoutes = require("./routes/contact");
const adminUserRoutes = require("./routes/users");

const errorRoutes = require("./utility/error");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "lookingtogetthisstarted",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }),
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// admin middleware
app.use("/", adminIndexRoutes);
app.use("/articles", adminArticleRoutes);
app.use("/articles/:slug/products", adminProductRoutes);
app.use("/messages", adminContactRoutes);

// error middleware
app.use(errorRoutes.errorMessage);
app.use(errorRoutes.AsyncError);

app.listen(PORT, () => console.log(`Server on PORT ${PORT}`));

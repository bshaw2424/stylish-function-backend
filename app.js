import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") {
  config();
}

import express from "express";
const app = express();
import bodyParser from "body-parser";
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./models/AdminUsers.js";

//replicate the functionality of __dirname - es6 module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import "./mongoDatabase.js";
//require("./utility/error");

const PORT = process.env.PORT || 5000;

// admin routes
import adminIndexRoutes from "./routes/admin/index.js";
import adminArticleRoutes from "./routes/admin/articles.js";
import adminProductRoutes from "./routes/admin/products.js";
import adminContactRoutes from "./routes/admin/contact.js";
import adminUserRoutes from "./routes/admin/users.js";

//const errorRoutes = require("./utility/error");

app.use(express.static("public"));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "lookingtogetthisstarted",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000, //1 hour
    },
  }),
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// admin middleware
app.use("/articles", adminArticleRoutes);
app.use("/articles/:slug/products", adminProductRoutes);
app.use("/messages", adminContactRoutes);

app.use("/", adminIndexRoutes, adminUserRoutes);

// error middleware
// app.use(errorRoutes.errorMessage);
// app.use(errorRoutes.AsyncError);

app.listen(PORT, () => console.log(`Server on PORT ${PORT}`));

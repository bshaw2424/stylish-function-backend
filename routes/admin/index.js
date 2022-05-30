"use strict";

//const subdomain = require("express-subdomain");
import express from "express";
const app = express();

const adminRouter = express.Router();
import passport from "passport";
//const { AsyncError } = require("../../utility/error");
import { checkAuthentication } from "../../middleware.js";
import { index, login, post, logout } from "../../controllers/admin/admin.js";

adminRouter.get("/dashboard", checkAuthentication, index);
adminRouter.get("/", login);
adminRouter.post(
  "/",
  passport.authenticate("local", { failureRedirect: "/" }),
  post,
);
adminRouter.get("/logout", logout);

//app.use(subdomain("admin", adminRouter));
export default adminRouter;

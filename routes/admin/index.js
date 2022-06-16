"use strict";

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
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  post,
);
adminRouter.get("/logout", logout);

export default adminRouter;

"use strict";

const express = require("express");
const router = express.Router();

const passport = require("passport");
//const { AsyncError } = require("../../utility/error");
const { checkAuthentication } = require("../middleware");
const { index, loginForm, login, logout } = require("../controllers/admin");

router.get("/", loginForm);

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/dashboard",
  })
);
router.get("/dashboard", index);
router.get("/logout", logout);

module.exports = router;

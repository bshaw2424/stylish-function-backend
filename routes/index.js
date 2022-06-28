"use strict";

const express = require("express");
const router = express.Router();

const passport = require("passport");
//const { AsyncError } = require("../../utility/error");
const { checkAuthentication } = require("../middleware");
const { index, login, logout } = require("../controllers/admin");

router.get("/", login);

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/dashboard",
  }),
  function (req, res) {
    res.redirect("/dashboard");
  },
);
router.get("/dashboard", checkAuthentication, index);
router.get("/logout", logout);

module.exports = router;

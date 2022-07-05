"use strict";

require("dotenv").config();
const ArticleModel = require("../models/Article");
//const { AsyncError } = require("../../utility/error");

module.exports.index = async (req, res) => {
  const articles = await ArticleModel.find();

  res.render("admin/adminIndex", { articles });
};

module.exports.loginForm = (req, res) => {
  res.render("admin/login");
};

module.exports.login = (req, res) => res.redirect("/");

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

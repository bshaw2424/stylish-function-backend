"use strict";

import { config } from "dotenv";
config();
import ArticleModel from "../../models/Article.js";
//const { AsyncError } = require("../../utility/error");

const index = async (req, res) => {
  const articles = await ArticleModel.find();

  res.render("admin/adminIndex", { articles });
};

// login in route

const login = (req, res) => {
  res.render("admin/login");
};

const post = (req, res) => {
  const redirectUrl = req.session.returnTo || "/dashboard";

  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

export { index, login, post, logout };

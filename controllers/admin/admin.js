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

const post = (req, res, next) => {
  const redirectUrl = req.session.returnTo || "/dashboard";

  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

const logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};

export { index, login, post, logout };
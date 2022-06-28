"use strict";

const UsersModel = require("../models/AdminUsers");

module.exports.index = (req, res) => {
  res.render("admin/index");
};

module.exports.create = (req, res) => {
  res.render("admin/users/create");
};

module.exports.post = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new UsersModel({ username });
    await UsersModel.register(user, password);
    await user.save();
    req.login(user, function (err) {
      if (err) return next(err);
      return res.redirect("/dashboard");
    });
  } catch (error) {
    res.redirect("/logout");
  }
};

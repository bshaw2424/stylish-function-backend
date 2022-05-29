"use strict";

import UsersModel from "../../models/AdminUsers.js";

const index = (req, res) => {
  res.render("admin/index");
};

const create = (req, res) => {
  res.render("admin/users/create");
};

const post = async (req, res) => {
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

export { index, create, post };

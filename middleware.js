"use strict";

module.exports.checkAuthentication = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

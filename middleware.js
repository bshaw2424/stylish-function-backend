"use strict";

module.exports.checkAuthentication = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    next();
  }
};

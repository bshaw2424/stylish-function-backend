"use strict";

const checkAuthentication = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // req.session.returnTo = req.originalUrl;
    next();
  }
};

export { checkAuthentication };

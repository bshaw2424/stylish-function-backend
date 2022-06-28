"use strict";

module.exports.errorMessage = (req, res) => {
  res.status(404).render("pages/error404Page");
};

module.exports.AsyncError = func => {
  return (req, res, next) => {
    func(req, res, next).catch(err => next(err));
  };
};

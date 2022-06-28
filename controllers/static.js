"use strict";

module.exports.aboutUs = (req, res) => res.render("pages/static/about-us");

module.exports.affiliateDisclaimer = (req, res) =>
  res.render("pages/static/affiliateDisclaimer");

module.exports.contactUs = (req, res) => res.render("static/contactUs");

module.exports.contactUsSuccess = (req, res) =>
  res.render("pages/static/success");

module.exports.privacyDisclosure = (req, res) =>
  res.render("pages/static/privacy-disclosure");

module.exports.termsOfService = (req, res) => res.render("pages/static/TOS");

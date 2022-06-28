"use strict";

const express = require("express");

const router = express.Router({ mergeParams: true });
//const { AsyncError } = require("../../utility/error");
const passport = require("passport");
const { index, create, post } = require("../controllers/users");

router.get("/", index);
router.get("/new", create);
router.post("/", post);

module.exports = router;

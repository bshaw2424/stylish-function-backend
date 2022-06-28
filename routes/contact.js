"use strict";

const express = require("express");

const router = express.Router();
//const { AsyncError } = require("../../utility/error");
const { checkAuthentication } = require("../middleware");

const {
  index,
  create,
  post,
  descSort,
  ascSort,
  showPage,
  Delete,
} = require("../controllers/contact");

router.get("/", checkAuthentication, index);
router.get("/new", create);
router.post("/", post);
router.get("/sortDesc/:sort", descSort);
router.get("/sortAsc/:sort", ascSort);
router.get("/:id", showPage);
router.delete("/:id", Delete);

module.exports = router;

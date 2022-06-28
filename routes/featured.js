"use strict";

import express from "express";
const router = express.Router();

const {
  index,
  create,
  post,
  showPage,
  edit,
  update,
  Delete,
} = require("../controllers/featured");

router.get("/", index);
router.get("/new", create);
router.post("/", post);
router.get("/:id", showPage);
router.get("/:id/edit", edit);
router.put("/:id", update);
router.delete("/:id", Delete);

module.exports = router;

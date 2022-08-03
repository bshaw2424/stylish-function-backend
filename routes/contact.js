"use strict";

const express = require("express");

const router = express.Router();
//const { AsyncError } = require("../../utility/error");
const { checkAuthentication } = require("../middleware");

const contactRoutes = require("../controllers/contact");

router.get("/", contactRoutes.index);
router.post("/", contactRoutes.post);
router.get("/sortDesc/:sort", contactRoutes.descSort);
router.get("/sortAsc/:sort", contactRoutes.ascSort);
router.get("/:id", contactRoutes.showPage);
router.delete("/:id", contactRoutes.delete);

module.exports = router;

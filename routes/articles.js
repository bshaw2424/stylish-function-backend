"use strict";

const express = require("express");
const multer = require("multer");
const router = express.Router({ mergeParams: true });
const { AsyncError } = require("../utility/error");
const session = require("express-session");
const { checkAuthentication } = require("../middleware");

const { storage } = require("../cloudinary/index");
const upload = multer({ storage });

const articleRoute = require("../controllers/articles");

router.get("/", articleRoute.index);
router.get("/new", articleRoute.create);
router.post("/", upload.single("Article[image]"), articleRoute.post);
router.get("/:slug", articleRoute.showPage);
router.get("/:slug/edit", articleRoute.edit);
router.put("/:slug", articleRoute.update);
router.get("/:slug/photo-edit", articleRoute.photoEdit);
router.patch(
  "/:slug/photo",
  upload.single("Article[image]"),
  articleRoute.photoUpdate
);
router.delete("/:slug", articleRoute.delete);

module.exports = router;

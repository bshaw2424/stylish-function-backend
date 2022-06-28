"use strict";

const express = require("express");

const router = express.Router({ mergeParams: true });
const { AsyncError } = require("../utility/error");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });
// {
//   index,
//   New,
//   Create,
//   showPage,
//   update,
//   edit,
//   photoEdit,
//   productPhotoUpdate,
//   delete,
// }
const productRoutes = require("../controllers/products");

router.get("/", productRoutes.index);
router.get("/new", productRoutes.new);
router.post("/", upload.single("Product[image]"), productRoutes.create);
router.get("/:product_slug", productRoutes.showPage);

router.patch(
  "/:product_slug",
  upload.single("Product[image]"),
  productRoutes.update,
);
router.get("/:product_slug/edit", productRoutes.edit);
router.get("/:product_slug/photo-edit", productRoutes.photoEdit); //product photo update
router.patch(
  "/:product_slug/product-photo",
  upload.single("Product[image]"),
  productRoutes.productPhotoUpdate,
);
router.delete("/:product_slug", productRoutes.delete);

module.exports = router;

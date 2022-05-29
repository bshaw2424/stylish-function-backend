"use strict";

//const subdomain = require("express-subdomain");
import express from "express";
const app = express();

const adminRouter = express.Router({ mergeParams: true });
//const { AsyncError } = require("../../utility/error");
import multer from "multer";
import { storage } from "../../cloudinary/index.js";
const upload = multer({ storage });

import {
  Index,
  New,
  Create,
  showPage,
  Update,
  Edit,
  photoEdit,
  productPhotoUpdate,
  Delete,
} from "../../controllers/admin/products.js";

adminRouter.route("/").get(Index).post(upload.single("Product[image]"), Create);
adminRouter.get("/new", New);
adminRouter
  .route("/:product_slug")
  .get(showPage)
  .patch(upload.single("Product[image]"), Update)
  .delete(Delete); //product update routes
adminRouter.get("/:product_slug/edit", Edit);
adminRouter.get("/:product_slug/photo-edit", photoEdit); //product photo update
adminRouter.patch(
  "/:product_slug/product-photo",
  upload.single("Product[image]"),
  productPhotoUpdate,
);

//app.use(subdomain("admin", adminRouter));
export default adminRouter;

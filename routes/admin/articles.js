"use strict";

// const subdomain = require("express-subdomain");
import express from "express";
const app = express();

const adminRouter = express.Router({ mergeParams: true });
//const { AsyncError } = require("../../utility/error");
import session from "express-session";
import { checkAuthentication } from "../../middleware.js";
import multer from "multer";
import { storage } from "../../cloudinary/index.js";
const upload = multer({ storage });

import {
  index,
  post,
  create,
  showPage,
  update,
  Delete,
  edit,
  photoEdit,
  photoUpdate,
} from "../../controllers/admin/articles.js";

adminRouter.route("/").get(index).post(upload.single("Article[image]"), post);
adminRouter.get("/new", checkAuthentication, create);
adminRouter
  .route("/:slug")
  .get(showPage)
  .patch(checkAuthentication, update)
  .delete(checkAuthentication, Delete); //edit routes
adminRouter.get("/:slug/edit", checkAuthentication, edit);
adminRouter.get("/:slug/photo-edit", checkAuthentication, photoEdit);
adminRouter.patch(
  "/:slug/photo",
  upload.single("Article[image]"),
  checkAuthentication,
  photoUpdate,
);

// app.use(subdomain("admin", adminRouter));
export default adminRouter;

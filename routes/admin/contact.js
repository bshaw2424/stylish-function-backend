"use strict";

// const subdomain = require("express-subdomain");
import express from "express";
const app = express();

const adminRouter = express.Router();
//const { AsyncError } = require("../../utility/error");
import { checkAuthentication } from "../../middleware.js";

import {
  index,
  create,
  post,
  descSort,
  ascSort,
  showPage,
  Delete,
} from "../../controllers/admin/contact.js";

adminRouter.get("/", checkAuthentication, index);
adminRouter.get("/new", create);
adminRouter.post("/", post);
adminRouter.get("/sortDesc/:sort", descSort);
adminRouter.get("/sortAsc/:sort", ascSort);
adminRouter.get("/:id", showPage);
adminRouter.delete("/:id", Delete);

// app.use(subdomain("admin", adminRouter));
export default adminRouter;

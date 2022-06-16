"use strict";

import express from "express";
const app = express();

const adminRouter = express.Router({ mergeParams: true });
//const { AsyncError } = require("../../utility/error");
import passport from "passport";
import { index, create, post } from "../../controllers/admin/users.js";

adminRouter.get("/", index);
adminRouter.get("/new", create);
adminRouter.post("/", post);

export default adminRouter;

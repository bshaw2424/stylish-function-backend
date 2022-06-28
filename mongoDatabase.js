"use strict";
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const MONGODB_URL = `mongodb+srv://bshaw-stylefunction:${process.env.DB_PASSWORD}@cluster0.3kkqi.mongodb.net/${process.env.DB_USER}`;
const databaseConnection = mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch(err => console.log(`Error: ${err.message}`));

module.exports = databaseConnection;

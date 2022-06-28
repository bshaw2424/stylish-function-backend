"use strict";

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema({
  username: {
    type: String,
    required: [true, "Username required"],
    unique: true,
  },
});
User.plugin(passportLocalMongoose);

module.exports = model("user", User);

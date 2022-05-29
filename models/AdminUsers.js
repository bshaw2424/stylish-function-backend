"use strict";

import mongoose from "mongoose";

const { Schema, model } = mongoose;

import passportLocalMongoose from "passport-local-mongoose";

const User = new Schema({
  username: {
    type: String,
    required: [true, "Username required"],
    unique: true,
  },
});
User.plugin(passportLocalMongoose);

export default model("user", User);

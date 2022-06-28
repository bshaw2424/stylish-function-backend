"use strict";

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  message_value: {
    type: Boolean,
    default: false,
  },
  created_on: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model("contact", contactSchema);

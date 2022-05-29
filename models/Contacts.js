"use strict";

import mongoose from "mongoose";

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

export default model("contact", contactSchema);

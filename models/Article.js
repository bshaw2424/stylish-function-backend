"use strict";

import mongoose from "mongoose";

const { Schema, model } = mongoose;

import slugify from "slugify";

const Articles = new Schema({
  title: {
    type: String,
    trim: true,
  },
  image: {
    url: String,
    filename: String,
  },
  sub_description: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  created_on: {
    type: Date,
    default: new Date(),
  },
});

Articles.pre("save", function (next) {
  this.slug = slugify(this.title, {
    lower: true,
  });
  next();
});

const Article = model("Article", Articles);
export default Article;

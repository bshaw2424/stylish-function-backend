"use strict";

import cloudinary from "cloudinary";
import { config } from "dotenv";
// config method from dotenv
config();
import { CloudinaryStorage } from "multer-storage-cloudinary";
import express from "express";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "stylish-function",
    allowedFormats: ["jpg", "png", "jpeg", "webp"],
  },
});

export { cloudinary, storage, multer };

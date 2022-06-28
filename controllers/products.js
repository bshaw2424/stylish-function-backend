"use strict";

const ArticleModel = require("../models/Article");
const ProductModel = require("../models/Product");
//import { AsyncError } from "../../utility/error");
const { convertPriceWithComma } = require("../functions");

module.exports.index = async (req, res, next) => {
  const { slug } = req.params;
  const products = await ArticleModel.findOne({ slug }).populate("products");
  res.render("admin/products/index", { products });
};

module.exports.new = async (req, res, next) => {
  const { slug } = req.params;
  const article = await ArticleModel.findOne({ slug });
  res.render("admin/products/create", { article });
};

module.exports.create = async (req, res, next) => {
  const { slug } = req.params;
  const { Product } = req.body;

  const article = await ArticleModel.findOne({ slug });
  const product = new ProductModel(Product);

  product.image.url = req.file.path;
  product.image.filename = req.file.filename;

  article.products.push(product);

  product.article = article;
  await product.save();
  await article.save();
  res.redirect(`/articles/${slug}`);
};

module.exports.showPage = async (req, res) => {
  const { product_slug, slug } = req.params;
  const product = await ProductModel.findOne({ slug: product_slug });
  const article = await ArticleModel.findOne({ slug: slug });
  res.render("admin/products/showPage", {
    product,
    article,
    convertPriceWithComma,
  });
};

module.exports.edit = async (req, res, next) => {
  const { slug, product_slug } = req.params;
  const product = await ProductModel.findOne({ slug: product_slug });
  const article = await ArticleModel.findOne({ slug: slug });
  res.render("admin/products/edit", { article, product });
};

module.exports.photoEdit = async (req, res) => {
  const { slug, product_slug } = req.params;
  const product = await ProductModel.findOne({ slug: product_slug });
  const article = await ArticleModel.findOne({ slug });
  res.render("admin/products/productPhotoEdit", { article, product });
};

module.exports.update = async (req, res, next) => {
  const { slug, product_slug } = req.params;
  const { Product } = req.body;
  const product = await ProductModel.findOneAndUpdate(
    {
      slug: product_slug,
    },
    { ...Product },
    {
      new: true,
    },
  );
  await product.save();
  res.redirect(`/articles/${slug}`);
};

module.exports.productPhotoUpdate = async (req, res) => {
  const { slug, product_slug } = req.params;

  const url = req.file.path;
  const path = req.file.filename;
  const product = await ProductModel.findOneAndUpdate(
    {
      slug: product_slug,
    },
    {
      new: true,
    },
  );
  product.image.url = url;
  product.image.filename = path;
  await product.save();
  res.redirect(`/articles/${slug}`);
};

module.exports.delete = async (req, res, next) => {
  const { slug, product_slug } = req.params;
  await ArticleModel.findOne({ slug: slug });
  await ProductModel.findOneAndDelete({ slug: product_slug });
  res.redirect(`/articles/${slug}`);
};

"use strict";

import ArticleModel from "../../models/Article.js";
import ProductModel from "../../models/Product.js";
//import { AsyncError } from "../../utility/error"); // function to covert price with a comma
import convertPriceWithComma from "../../functions.js"; // products associated to article

const Index = async (req, res, next) => {
  const { slug } = req.params;
  const products = await ArticleModel.findOne({ slug }).populate("products");
  res.render("admin/products/index", { products });
};

const New = async (req, res, next) => {
  const { slug } = req.params;
  const article = await ArticleModel.findOne({ slug });
  res.render("admin/products/create", { article });
}; // creates and add new product associated to article to database

const Create = async (req, res, next) => {
  const { slug } = req.params;
  const { Product } = req.body;

  const article = await ArticleModel.findOne({ slug });
  const product = new ProductModel(Product);

  product.image.url = req.file.path;
  product.image.filename = req.file.filename; // push the created product to the article using refs

  article.products.push(product); // reference the article to the product areas

  product.article = article;
  await product.save();
  await article.save();
  res.redirect(`/articles/${slug}`);
};

const showPage = async (req, res) => {
  const { product_slug } = req.params;
  const product = await ProductModel.findOne({ slug: product_slug });
  res.render("admin/products/showPage", {
    product,
    convertPriceWithComma,
  });
};

const edit = async (req, res, next) => {
  const { slug, product_slug } = req.params;
  const product = await ProductModel.findOne({ slug: product_slug });
  const article = await ArticleModel.findOne({ slug: slug });
  res.render("admin/products/edit", { article, product });
};

const photoEdit = async (req, res) => {
  const { slug, product_slug } = req.params;
  const product = await ProductModel.findOne({ slug: product_slug });
  const article = await ArticleModel.findOne({ slug });
  res.render("admin/products/productPhotoEdit", { article, product });
};

const Update = async (req, res, next) => {
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

const productPhotoUpdate = async (req, res) => {
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

const Delete = async (req, res, next) => {
  const { slug, product_slug } = req.params;
  await ArticleModel.findOne({ slug: slug });
  await ProductModel.findOneAndDelete({ slug: product_slug });
  res.redirect(`/articles/${slug}`);
};

export {
  Index,
  New,
  Create,
  showPage,
  Update,
  edit,
  photoEdit,
  productPhotoUpdate,
  Delete,
};

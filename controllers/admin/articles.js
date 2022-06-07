"use strict";

import ArticleModel from "../../models/Article.js";

//const { AsyncError } = require("../../utility/error"); //show all admin articles

const index = async (req, res) => {
  const articles = await ArticleModel.find({});
  res.render("admin/articles/index", { articles });
};

const create = (req, res) => {
  res.render("admin/articles/create");
};

const post = async (req, res) => {
  let { Article } = req.body;
  const article = new ArticleModel(Article);
  article.image.url = req.file.path;
  article.image.filename = req.file.filename;
  await article.save();
  res.redirect("/admin/articles");
};

const showPage = async (req, res, next) => {
  const { slug } = req.params;
  const articles = await ArticleModel.findOne({
    slug,
  }).populate("products");
  res.render("admin/articles/showPage", {
    articles,
  });
};

const edit = async (req, res) => {
  const { slug } = req.params;
  const articles = await ArticleModel.findOne({
    slug: slug,
  });
  res.render("admin/articles/edit", { articles });
};

const update = async (req, res) => {
  const { slug } = req.params;
  const { Article } = req.body;
  const article = await ArticleModel.findOneAndUpdate(
    {
      slug: slug,
    },
    { ...Article },
    {
      new: true,
    },
  );
  await article.save();
  res.redirect("/admin/articles");
};

const photoEdit = async (req, res) => {
  const { slug } = req.params;
  const articles = await ArticleModel.findOne({
    slug: slug,
  });
  res.render("admin/articles/photoEdit", {
    articles,
  });
};

const photoUpdate = async (req, res) => {
  const { slug } = req.params;
  const url = req.file.path;
  const path = req.file.filename;
  const article = await ArticleModel.findOneAndUpdate(
    {
      slug,
    },
    {
      new: true,
    },
  );
  article.image.url = url;
  article.image.filename = path;
  await article.save();
  res.redirect("/admin/articles");
};

const Delete = async (req, res, next) => {
  const { slug } = req.params;
  await ArticleModel.findOneAndDelete({ slug: slug });
  res.redirect("/admin/articles");
};

export {
  index,
  create,
  post,
  showPage,
  edit,
  update,
  photoEdit,
  photoUpdate,
  Delete,
};

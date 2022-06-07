"use strict";

import fetch from "node-fetch";
import ContactModel from "../../models/Contacts.js";
import { config } from "dotenv";
// config method from dotenv - loads env file content
config();

const index = async (req, res) => {
  const messages = await ContactModel.find({});

  res.render("admin/contacts/contact", {
    messages,
    sortMessage: "All Clear...No Messages",
  });
};

const create = (req, res) => res.render("admin/contacts/contactUs");

const post = async (req, res) => {
  const { Message } = req.body;
  const newMessage = new ContactModel(Message);

  // reCaptcha response token
  const reCaptchaBodyResponse = req.body["g-recaptcha-response"];

  const verifyCaptchaResponseURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${reCaptchaBodyResponse}`;

  const response = await fetch(verifyCaptchaResponseURL);
  const data = await response.json();

  if (data.success === true) {
    await newMessage.save();
  }
  res.redirect("/contact/success");
};

const ascSort = async (req, res) => {
  const ascendingSort = await ContactModel.find({}).sort({ created_on: 1 });
  res.render("admin/contacts/contactAscendingSort", {
    ascendingSort,
    sortMessage: "All Clear...No Messages",
  });
};

const descSort = async (req, res) => {
  const descendingSort = await ContactModel.find({}).sort({ created_on: -1 });
  res.render("admin/contacts/contactDescendingSort", {
    descendingSort,
    sortMessage: "All Clear...No Messages",
  });
};

const showPage = async (req, res) => {
  const { id } = req.params;
  const message = await ContactModel.findById(id);
  res.render("admin/contacts/contactShowPage", { message });
};

const Delete = async (req, res) => {
  const { id } = req.params;
  const deleteMessage = await ContactModel.findByIdAndDelete(id);
  res.redirect("/messages");
};

export { index, create, post, ascSort, descSort, showPage, Delete };

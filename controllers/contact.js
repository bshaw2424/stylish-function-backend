"use strict";

const fetch = require("node-fetch");
const ContactModel = require("../models/Contacts");
const { convertEmailToLowerCase } = require("../functions");
require("dotenv").config();

module.exports.index = async (req, res) => {
  // const fetchContactsUrlfromDatabase =
  //   "https://data.mongodb-api.com/app/data-hsqwk/endpoint/data/v1/action/find";

  // const fetchConfigurationToGetContacts = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Request-Headers": "*",
  //     "api-key": process.env.MONGO_KEY,
  //     Accept: "application/json",
  //   },
  //   body: JSON.stringify({
  //     collection: "contacts",
  //     database: "affiliate_products",
  //     dataSource: "Cluster0",
  //   }),
  // };

  // try {
  //   const response = await fetch(
  //     fetchContactsUrlfromDatabase,
  //     fetchConfigurationToGetContacts,
  //   );
  //   if (!response.ok) {
  //     throw new Error();
  //   }
  //   const messages = await response.json();
  //   const { documents } = messages;
  //   const contactDataResponse = documents;

  //   res.render("admin/contacts/contact", {
  //     contactDataResponse,
  //     contactLengthMessage: "All Clear...No Messages",
  //   });
  // } catch (error) {
  //   console.log(error.message);
  // }

  const messages = await ContactModel.find({}).sort({ created_on: -1 });
  res.render("admin/contacts/contact", {
    messages,
    contactLengthMessage: "All Clear...No Messages",
  });
};

module.exports.post = async (req, res) => {
  const { Messages } = req.body;
  console.log(Messages);
  const response = await fetch("/messages");
  const data = response.json();
  console.log(data);
  // const fetchContactsUrlfromDatabase =
  //   "https://data.mongodb-api.com/app/data-hsqwk/endpoint/data/v1/action/find";

  // const fetchConfigurationToGetContacts = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Request-Headers": "*",
  //     "api-key": process.env.MONGO_KEY,
  //     Accept: "application/json",
  //   },
  //   body: JSON.stringify({
  //     collection: "contacts",
  //     database: "affiliate_products",
  //     dataSource: "Cluster0",
  //   }),
  // };

  // try {
  //   const response = await fetch(
  //     fetchContactsUrlfromDatabase,
  //     fetchConfigurationToGetContacts,
  //   );
  //   if (!response.ok) {
  //     throw new Error();
  //   }
  //   const messages = await response.json();
  //   const { documents } = messages;
  //   const contactDataResponse = documents;

  //   res.render("admin/contacts/contact", {
  //     contactDataResponse,
  //     contactLengthMessage: "All Clear...No Messages",
  //   });
  // } catch (error) {
  //   console.log(error.message);
  // }
};

module.exports.ascSort = async (req, res) => {
  const ascendingSort = await ContactModel.find({}).sort({ created_on: 1 });
  res.render("admin/contacts/contactAscendingSort", {
    ascendingSort,
    sortMessage: "All Clear...No Messages",
  });
};

module.exports.descSort = async (req, res) => {
  const descendingSort = await ContactModel.find({}).sort({ created_on: -1 });
  res.render("admin/contacts/contactDescendingSort", {
    descendingSort,
    sortMessage: "All Clear...No Messages",
  });
};

module.exports.showPage = async (req, res) => {
  const { id } = req.params;
  const message = await ContactModel.findById(id);
  res.render("admin/contacts/contactShowPage", {
    message,
    convertEmailToLowerCase,
  });
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const deleteMessage = await ContactModel.findByIdAndDelete(id);
  res.redirect("/messages");
};

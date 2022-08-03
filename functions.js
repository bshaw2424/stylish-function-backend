"use strict";

module.exports.convertPriceWithComma = price => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

module.exports.convertEmailToLowerCase = email => {
  const splitEmailCharacters = email.split("");
  const emailCharacters = splitEmailCharacters.map(characters => {
    return characters.toUpperCase();
  });
  return emailCharacters.join("");
};

module.exports.fetchContacts = async () => {
  let config = {
    method: "POST",
    // url: "https://data.mongodb-api.com/app/data-hsqwk/endpoint/data/v1/action/findOne",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key":
        "nr30WsioMapR22ZgIaqb30immPQFG1hz8nLSvapHilTyC0auvtsoxLCbnGKuinFL",
      Accept: "application/json",
    },
    body: JSON.stringify({
      collection: "contacts",
      database: "affiliate_products",
      dataSource: "Cluster0",
    }),
  };

  try {
    const response = await fetch(
      "https://data.mongodb-api.com/app/data-hsqwk/endpoint/data/v1/action/find",
      config,
    );
    const messages = await response.json();
    console.log(messages);
  } catch (error) {
    if (error) {
      return new Error(error.message);
    }
  }
};

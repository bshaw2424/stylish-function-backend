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

"use strict";

const convertPriceWithComma = price => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default convertPriceWithComma;

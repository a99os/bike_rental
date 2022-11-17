const shopinfo = require("./shopinfo.validation");
const user = require("./user.validation");
const adsmanagment = require("./adsmanagment.validation");
const usergroup = require("./usergroup.validation");
const rental = require("./rental.validation");
const bikecategory = require("./bikecategory.validation");
const bikeinfo = require("./bikeinfo.validation");
const client = require("./client.validation");
const payment = require("./payment.validation");
const penalty = require("./penalty.validation");
module.exports = {
  penalty,
  payment,
  client,
  bikeinfo,
  bikecategory,
  rental,
  shopinfo,
  user,
  adsmanagment,
  usergroup,
};

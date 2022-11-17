const Joi = require("joi");
const Schema = Joi.object({
  shop_name: Joi.string().required().trim(),
  owner_name: Joi.string().required().trim(),
  address: Joi.string().required().trim(),
  email_address: Joi.string().required().trim(),
  contact_no: Joi.string().required().trim(),
  website: Joi.string().required().trim(),
  updated_by: Joi.number().required(),
});

module.exports = Schema;

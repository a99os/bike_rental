const Joi = require("joi");
const Schema = Joi.object({
  bike_category_id: Joi.number().required(),
  shop_id: Joi.number().required(),
  bike_name: Joi.string().required().trim(),
  specs: Joi.string().required().trim(),
  rent_price: Joi.number().required(),
  availabilty: Joi.boolean().required(),
  user_id: Joi.number().required(),
});

module.exports = Schema;

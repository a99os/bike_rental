const Joi = require("joi");
const Schema = Joi.object({
  name: Joi.string().required().trim(),
  shop_id: Joi.number().required(),
  banner_image: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  ad_location: Joi.boolean().required(),
  amount: Joi.number().required(),
  user_id: Joi.number().required(),
});

module.exports = Schema;

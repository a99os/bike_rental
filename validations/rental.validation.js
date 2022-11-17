const Joi = require("joi");
const Schema = Joi.object({
  bike_id: Joi.number().required(),
  client_id: Joi.number().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  total_amount: Joi.number().required(),
  payment_status: Joi.boolean().required(),
  rental_status: Joi.boolean().required(),
  remarks: Joi.string().required().trim(),
  user_id: Joi.number().required(),
});

module.exports = Schema;

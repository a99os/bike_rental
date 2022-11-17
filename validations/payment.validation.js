const Joi = require("joi");
const Schema = Joi.object({
  rental_id: Joi.number().required(),
  payment_type: Joi.number().required(),
  paid_by: Joi.string().required().trim(),
  payment_date: Joi.date().required(),
  remarks: Joi.string().required().trim(),
  user_id: Joi.number().required(),
});

module.exports = Schema;

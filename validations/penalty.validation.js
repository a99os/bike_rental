const Joi = require("joi");
const Schema = Joi.object({
  rental_id: Joi.number().required(),
  penalty_amount: Joi.number().required(),
  payment_status: Joi.boolean().required(),
  remarks: Joi.string().required().trim(),
  paid_by: Joi.string().required().trim(),
  user_id: Joi.number().required(),
});

module.exports = Schema;

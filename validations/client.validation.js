const Joi = require("joi");
const Schema = Joi.object({
  client_code: Joi.number().required(),
  avatar: Joi.string().required().trim(),
  client_name: Joi.string().required().trim(),
  email_address: Joi.string().required().trim(),
  contact_number: Joi.string().required().trim(),
  complete_address: Joi.string().required().trim(),
  username: Joi.string().required().trim(),
  password: Joi.string().required().trim(),
  status: Joi.boolean().required(),
  otp_id: Joi.string(),
});

module.exports = Schema;

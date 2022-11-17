const Joi = require("joi");
const Schema = Joi.object({
  usename: Joi.string().required().trim(),
  password: Joi.string().required().trim(),
  avatar: Joi.string().required().trim(),
  fullname: Joi.string().required().trim(),
  contact: Joi.string().required().trim(),
  email: Joi.string().email().required(),
  user_category_id: Joi.number().required(),
  status: Joi.boolean().required(),
  otp_id: Joi.string(),
});

module.exports = Schema;

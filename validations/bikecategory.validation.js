const Joi = require("joi");
const Schema = Joi.object({
  category_name: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
});

module.exports = Schema;

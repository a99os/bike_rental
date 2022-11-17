const Joi = require("joi");
const Schema = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  allow_add: Joi.boolean().required(),
  allow_edit: Joi.boolean().required(),
  allow_delete: Joi.boolean().required(),
  allow_print: Joi.boolean().required(),
  allow_import: Joi.boolean().required(),
  allow_export: Joi.boolean().required(),
});

module.exports = Schema;

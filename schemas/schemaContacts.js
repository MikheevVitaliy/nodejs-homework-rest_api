// Проверка заполнености body
const Joi = require('joi');

// Проверка на наличие всех полей в body
const addSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .messages({
      'any.required': `missing required name field`,
    })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      'any.required': `missing required email field`,
    })
    .required(),
  phone: Joi.string()
    .min(5)
    .max(20)
    .messages({
      'any.required': `missing required phone field`,
    })
    .required(),
});

module.exports = {
  addSchema,
};

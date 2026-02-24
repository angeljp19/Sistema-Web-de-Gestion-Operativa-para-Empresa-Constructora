import Joi from "joi";

export const createProductoSchema = Joi.object({
  nombre: Joi.string().max(150).required().messages({
    "string.base": "El nombre debe ser un texto",
    "string.max": "El nombre no puede tener más de 150 caracteres",
    "any.required": "El nombre es obligatorio",
  }),
});

export const updateProductoSchema = Joi.object({
  nombre: Joi.string().max(150).optional().messages({
    "string.base": "El nombre debe ser un texto",
    "string.max": "El nombre no puede tener más de 150 caracteres",
  }),
});

export const deleteProductoSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "El ID debe ser un número",
    "number.integer": "El ID debe ser un número entero",
    "number.positive": "El ID debe ser mayor a 0",
    "any.required": "El ID es obligatorio",
  }),
});

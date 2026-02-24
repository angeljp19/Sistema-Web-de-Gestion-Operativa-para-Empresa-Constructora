import Joi from "joi";

//
// REGLAS BASE SEGÚN EL MODELO
//
const nombre = Joi.string()
  .max(100)
  .trim()
  .required()
  .messages({
    "string.base": "El nombre debe ser un texto.",
    "string.max": "El nombre no puede tener más de 100 caracteres.",
    "any.required": "El nombre es obligatorio."
  });

const apellido = Joi.string()
  .max(100)
  .trim()
  .required()
  .messages({
    "string.base": "El apellido debe ser un texto.",
    "string.max": "El apellido no puede tener más de 100 caracteres.",
    "any.required": "El apellido es obligatorio."
  });

const cedula = Joi.number()
  .integer()
  .min(1)
  .required()
  .messages({
    "number.base": "La cédula debe ser un número.",
    "number.min": "La cédula debe ser mayor a 0.",
    "any.required": "La cédula es obligatoria."
  });

const planta_id = Joi.number()
  .integer()
  .min(1)
  .required()
  .messages({
    "number.base": "El ID de la planta debe ser un número.",
    "any.required": "El campo 'planta_id' es obligatorio.",
  });

const activo = Joi.boolean()
  .optional()
  .messages({
    "boolean.base": "El campo 'activo' debe ser verdadero o falso."
  });

//
// SCHEMA PARA CREAR
//
export const createEmpleadoSchema = Joi.object({
  nombre,
  apellido,
  cedula,
  planta_id,
  activo,
}).messages({
  "object.unknown": "No se permiten campos adicionales."
});

//
// SCHEMA PARA ACTUALIZAR
// Todos los campos son OPCIONALES exceptuando al menos uno.
//
export const updateEmpleadoSchema = Joi.object({
  nombre: nombre.optional(),
  apellido: apellido.optional(),
  cedula: cedula.optional(),
  planta_id: planta_id.optional(),
  activo: activo.optional(),
})
  .min(1) // obliga a enviar al menos un campo
  .messages({
    "object.min": "Debe enviar al menos un campo para actualizar.",
    "object.unknown": "No se permiten campos adicionales."
  });

//
// SCHEMA PARA ELIMINAR O BUSCAR POR ID
//
export const idEmpleadoSchema = Joi.object({
  id: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "El ID debe ser un número.",
      "number.min": "El ID debe ser mayor a 0.",
      "any.required": "El ID es obligatorio.",
    }),
});

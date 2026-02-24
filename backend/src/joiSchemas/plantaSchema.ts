import Joi from "joi";

const nombre = Joi.string().min(2).max(100);
const ubicacion = Joi.string().min(2).max(200);
const id = Joi.number().integer().min(1);

export const createPlantaSchema = Joi.object({
  nombre: nombre.required(),
  ubicacion: ubicacion.required(),
});

export const updatePlantaSchema = Joi.object({
  nombre: nombre.optional(),
  ubicacion: ubicacion.optional(),
}).min(1);

export const idPlantaSchema = Joi.object({
  id: id.required(),
});

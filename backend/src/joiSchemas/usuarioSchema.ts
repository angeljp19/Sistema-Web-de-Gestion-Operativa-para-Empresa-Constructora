import Joi from "joi";

// --- Reglas base para reutilizar ---
const nombre = Joi.string().min(2).max(100);
const apellido = Joi.string().min(2).max(100);
const email = Joi.string().email().max(150);
const cedula = Joi.number().integer().min(1);
const password = Joi.string().min(6).max(255);
const activo = Joi.boolean();

// --- CREATE ---
export const createUsuarioSchema = Joi.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  email: email.required(),
  cedula: cedula.required(),
  password: password.required(),
  activo: activo.optional()
});

// --- UPDATE ---
export const updateUsuarioSchema = Joi.object({
  nombre: nombre.optional(),
  apellido: apellido.optional(),
  email: email.optional(),
  cedula: cedula.optional(),
  password: password.optional(),
  activo: activo.optional()
}).min(1); // obliga a enviar al menos un campo

// --- DELETE / GET BY ID ---
export const idUsuarioSchema = Joi.object({
  id: Joi.number().integer().min(1).required()
});

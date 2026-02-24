import Joi from "joi";

const empleado_id = Joi.number().integer().min(1);
const fechaHora = Joi.date();
const motivo = Joi.string().min(1).max(10);

// --- CREATE ---
export const createHoraEscaneoSchema = Joi.object({
  empleado_id: empleado_id.required(),
  motivo: motivo.required(),
  fechaHora: fechaHora.optional(),
});

// --- UPDATE ---
/*export const updateHoraEscaneoSchema = Joi.object({
  empleado_id: empleado_id.optional(),
  motivo: motivo.optional(),
  fechaHora: fechaHora.optional(),
}).min(1);*/

// --- GET/DELETE por ID ---
export const idHoraEscaneoSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

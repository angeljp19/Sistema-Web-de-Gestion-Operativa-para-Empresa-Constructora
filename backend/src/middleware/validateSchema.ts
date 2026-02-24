import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export function validateSchema(schema: Joi.Schema, property: "body" | "params" | "query" = "body") {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,      
      stripUnknown: true,     
    });

    if (error) {
      return res.status(400).json({
        message: "Datos inválidos",
        errors: error.details.map((err) => err.message),
      });
    }

    req[property] = value;
    next();
  };
}

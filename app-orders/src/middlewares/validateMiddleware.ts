import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateMiddleware =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Erro de validação",
          errors: error.errors
        });
      }
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateSchema = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((issue) => ({
          field: issue.path.join(".") || "body",
          message: issue.message,
        }));

        return res.status(400).json({ errors: formattedErrors });
      }

      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
};

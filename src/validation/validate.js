import { ZodError } from "zod";
import { AppError } from "../errors/appError.js";

export function validate(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(
          new AppError({
            code: "INVALID_INPUT",
            message: "Validation error",
            statusCode: 400,
            details: error.issues,
          })
        );
      }

      next(error);
    }
  };
}

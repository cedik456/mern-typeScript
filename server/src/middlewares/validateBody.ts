import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { errorResponse } from "../utils/responseHandler";

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return errorResponse(res, 400, false, error.issues[0].message);
      }
      return errorResponse(res, 500, false, "Internal Server Error");
    }
  };
};

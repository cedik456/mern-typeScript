import { Response } from "express";

export const successResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  data: T
): Response => {
  return res.status(statusCode).json({
    statusCode,
    success,
    data,
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  error: string
): Response => {
  return res.status(statusCode).json({
    statusCode,
    success,
    error,
  });
};

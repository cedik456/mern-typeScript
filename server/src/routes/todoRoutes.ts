import { Router, Request, Response } from "express";
import TodoModel from "../models/Todo";
import { errorResponse, successResponse } from "../utils/responseHandler";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const todos = await TodoModel.find();
    return successResponse(res, 200, true, todos);
  } catch (error) {
    return errorResponse(res, 500, false, "Failed to fetch todos");
  }
});

export default router;

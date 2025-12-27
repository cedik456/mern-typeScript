import { Request, Response } from "express";
import TodoModel from "../models/Todo";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { CreateTodoRequest, UpdateTodoRequest } from "../types/Todo";

export const getTodos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const todos = await TodoModel.find();
    successResponse(res, 200, true, todos);
  } catch (error) {
    errorResponse(res, 500, false, "Failed to fetch todos");
  }
};

export const addTodos = async (
  req: Request<{}, {}, CreateTodoRequest>,
  res: Response
): Promise<void> => {
  const todo = await TodoModel.create(req.body);
  successResponse(res, 201, true, todo);
};

export const updateTodos = async (
  req: Request<{ id: string }, {}, UpdateTodoRequest>,
  res: Response
): Promise<void> => {
  try {
    const updateData = req.body;
    const updateTodo = await TodoModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!updateTodo) {
      errorResponse(res, 404, false, "Todo not found");
      return;
    }

    successResponse(res, 200, true, updateTodo);
  } catch (error) {
    errorResponse(res, 500, false, "Failed to update todo");
  }
};

export const deleteTodo = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      errorResponse(res, 400, false, "ID is required");
      return;
    }

    const deleteTodo = await TodoModel.findByIdAndDelete(id);

    if (!deleteTodo) {
      errorResponse(res, 400, false, "Todo not found");
      return;
    }

    successResponse(res, 200, true, deleteTodo);
  } catch (error) {
    errorResponse(res, 500, false, "Failed to delete todo");
  }
};

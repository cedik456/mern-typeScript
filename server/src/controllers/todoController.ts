import { Request, Response } from "express";
import TodoModel from "../models/Todo";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { CreateTodoRequest, UpdateTodoRequest } from "../types/Todo";
import { createTodoSchema } from "../schemas/todo.schema";

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
  try {
    const parseBody = createTodoSchema.parse(req.body);

    const todo = await TodoModel.create(parseBody);

    successResponse(res, 201, true, todo);
  } catch (error) {
    errorResponse(res, 500, false, "Failed to create todo");
  }
};

export const updateTodos = async (
  req: Request<{ id: string }, {}, UpdateTodoRequest>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    if (!id) {
      errorResponse(res, 400, false, "ID is required");
    }

    const updateTodo = await TodoModel.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );

    if (!updateTodo) {
      errorResponse(res, 404, false, "Todo not found");
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
    }

    const deleteTodo = await TodoModel.findByIdAndDelete(id);

    if (!deleteTodo) {
      errorResponse(res, 400, false, "Todo not found");
    }

    successResponse(res, 200, true, deleteTodo);
  } catch (error) {
    errorResponse(res, 500, false, "Failed to delete todo");
  }
};

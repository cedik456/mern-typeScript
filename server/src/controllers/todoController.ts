import { Request, Response } from "express";
import TodoModel from "../models/Todo";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { CreateTodoRequest, UpdateTodoRequest } from "../types/Todo";

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date } = req.query;

    // Use the date the client gave, or today if none
    const d = date ? new Date(`${date}T00:00:00Z`) : new Date();

    if (!date) {
      // force today to UTC midnight
      d.setUTCHours(0, 0, 0, 0);
    }

    if (isNaN(d.getTime())) {
      errorResponse(res, 400, false, "Invalid date format");
    }

    const startOfDay = new Date(d);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(d);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const todos = await TodoModel.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ createdAt: -1 });

    successResponse(res, 200, true, todos);
  } catch (err) {
    errorResponse(res, 500, false, "Failed to fetch todos");
  }
};

export const addTodos = async (
  req: Request<{}, {}, CreateTodoRequest>,
  res: Response
): Promise<void> => {
  // Normalize date to start of day
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const todoData = {
    ...req.body,
    date: today,
    completed: req.body.completed ?? false,
  };

  const todo = await TodoModel.create(todoData);
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

import { Router, Request, Response } from "express";
import {
  addTodos,
  deleteTodo,
  getTodos,
  updateTodos,
} from "../controllers/todoController";
import { validateBody } from "../middlewares/validateBody";
import { createTodoSchema, updateTodoSchema } from "../schemas/todo.schema";

const router = Router();

router.get("/", getTodos);

router.post("/", validateBody(createTodoSchema), addTodos);

router.put("/:id", validateBody(updateTodoSchema), updateTodos);

router.delete("/:id", deleteTodo);

export default router;

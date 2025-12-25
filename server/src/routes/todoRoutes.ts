import { Router, Request, Response } from "express";
import {
  addTodos,
  deleteTodo,
  getTodos,
  updateTodos,
} from "../controllers/todoController";

const router = Router();

router.get("/", getTodos);

router.post("/", addTodos);

router.put("/:id", updateTodos);

router.delete("/:id", deleteTodo);

export default router;

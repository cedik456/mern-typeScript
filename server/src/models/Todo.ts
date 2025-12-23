import { Schema, model } from "mongoose";

interface Todo {
  title: string;
  description?: string;
  completed: boolean;
}

const todoSchema = new Schema<Todo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const TodoModel = model<Todo>("Todo", todoSchema);

export default TodoModel;

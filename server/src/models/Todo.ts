import { Schema, model } from "mongoose";

interface Todo {
  title: string;
  description?: string;
  completed: boolean;
  date: Date;
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
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const TodoModel = model<Todo>("Todo", todoSchema);

export default TodoModel;

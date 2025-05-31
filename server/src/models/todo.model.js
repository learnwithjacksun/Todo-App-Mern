import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    ownerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = model("Todo", todoSchema);

export default Todo;


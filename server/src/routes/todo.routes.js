import { Router } from "express";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todo.controllers.js";

const router = Router();

router.post("/", createTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;



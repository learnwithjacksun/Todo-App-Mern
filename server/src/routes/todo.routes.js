import { Router } from "express";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todo.controllers.js";
import { authenticate } from "../middleware/auth.js";
const router = Router();

router.post("/", authenticate, createTodo);
router.get("/", authenticate, getTodos);
router.put("/:id", authenticate, updateTodo);
router.delete("/:id", authenticate, deleteTodo);

export default router;



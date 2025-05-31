import { StatusCodes } from "http-status-codes";
import Todo from "../models/todo.model.js";

export const createTodo = async (req, res)=>{
    const {ownerId, title } = req.body;
    try {
        if(!title) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Title is required",
            });
        }

        const todo = await Todo.create({ ownerId, title });

        res.status(StatusCodes.CREATED).json({
            message: "Todo created successfully",
            todo: {
                id: todo._id,
                title: todo.title,
                ownerId: todo.ownerId,
                completed: todo.completed,
                createdAt: todo.createdAt,
                updatedAt: todo.updatedAt,
            }
        });
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
}

export const getTodos = async (req, res)=>{
    try {
        const todos = await Todo.find({ownerId: req.user._id}).sort({ createdAt: -1 });
        const transformedTodos = todos.map(todo => ({
            id: todo._id,
            ownerId: todo.ownerId,
            title: todo.title,
            completed: todo.completed,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt
        }));
        res.status(StatusCodes.OK).json({
            message: "Todos fetched successfully",
            todos: transformedTodos,
            status: "success",
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
}

export const updateTodo = async (req, res)=>{
    const { id } = req.params;
    const { completed } = req.body;
    try {
        const todo = await Todo.findByIdAndUpdate(id, { completed }, { new: true }); 
        res.status(StatusCodes.OK).json({
            message: "Todo updated successfully",
            todo: {
                id: todo._id,
                ownerId: todo.ownerId,
                title: todo.title,
                completed: todo.completed,
                createdAt: todo.createdAt,
                updatedAt: todo.updatedAt,
            }
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
}


export const deleteTodo = async (req, res)=>{
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(StatusCodes.OK).json({
            message: "Todo deleted successfully",
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
}
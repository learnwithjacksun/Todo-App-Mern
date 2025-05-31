import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/connectDB.js";
import todoRoutes from "./routes/todo.routes.js";
import authRoutes from "./routes/user.routes.js"


const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ["https://learn-todo-mern.netlify.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.get("/", (_req, res) => {
    res.json({ message: "API is running! ✅", status: "success" });
});

app.use("/api/todos", todoRoutes);
app.use("/api/todos/:id", todoRoutes);
app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});


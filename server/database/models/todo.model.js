import mongoose from "mongoose";
import todoSchema from "../schemas/todo.schema.js";

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
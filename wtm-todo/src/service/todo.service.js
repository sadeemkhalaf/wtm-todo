import axios from "axios";
import authHeader from './auth.header.js';

const API_URL = "http://localhost:8080/";

const GetAllTodos = () => {
    return axios.get(API_URL + "all", { headers: authHeader() });
};

const AddTodo = (todoObject) => {
    return axios.post(API_URL + `add-todo`,todoObject ,{ headers: authHeader() });
};

const GetTodo = (todoID) => {
    return axios.post(API_URL + `todo/${todoID}`,{} ,{ headers: authHeader() });
};

const UpdateTodo = (todo) => {
    return axios.patch(API_URL + `todo/${todo._id}`, {isCompleted: !todo.isCompleted} ,{ headers: authHeader() });
};

const DeleteTodo = (todoID) => {
    return axios.delete(API_URL + `todo/${todoID}`, { headers: authHeader() });
};


export default {
    GetAllTodos,
    AddTodo,
    GetTodo,
    UpdateTodo,
    DeleteTodo
};
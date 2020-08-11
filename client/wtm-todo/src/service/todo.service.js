import axios from "axios";
import authHeader from './auth.header.js';

const API_URL = "http://localhost:8080/";

const GetAllTodos = () => {
    return axios.get(API_URL + "all", { headers: authHeader() });
};

const AddTodo = () => {
    return axios.post(API_URL + `/add-todo`,{} ,{ headers: authHeader() });
};

const GetTodo = () => {
    return axios.post(API_URL + `/todo/${todoID}`,{} ,{ headers: authHeader() });
};

const UpdateTodo = (todoID) => {
    return axios.get(API_URL + `/todo/${todoID}`, { headers: authHeader() });
};

const DeleteTodo = (todoID) => {
    return axios.get(API_URL + `/todo/${todoID}`, { headers: authHeader() });
};


export default {
    GetAllTodos,
    AddTodo,
    GetTodo,
    UpdateTodo,
    DeleteTodo
};
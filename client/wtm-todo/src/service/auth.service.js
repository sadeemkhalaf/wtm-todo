import axios from "axios";
import authHeader from './auth.header';

const API_URL = "http://localhost:8080/";

const Register = (name, email, password) => {
  return axios.post(API_URL + "signup", {
    name,
    email,
    password,
  });
};

const Login = ({ email, password }) => {
  return axios
    .post(API_URL + "login", {
      email,
      password
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const Auth = () => {
  return axios
    .get(API_URL + "auth", { headers: authHeader() })
};

const Logout = () => {
  return axios
    .get(API_URL + "signout", { headers: authHeader() })
    .then(() => {
      localStorage.removeItem("user");
    });
};

const GetCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  Register,
  Login,
  Logout,
  GetCurrentUser,
  Auth
};


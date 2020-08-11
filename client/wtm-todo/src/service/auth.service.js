import axios from "axios";

const API_URL = "http://localhost:8080/";

const Register = (name, email, password) => {
  return axios.post(API_URL + "signup", {
    name,
    email,
    password,
  });
};

const Login = ({email, password}) => {
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

const Logout = () => {
  localStorage.removeItem("user");
};

const GetCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  Register,
  Login,
  Logout,
  GetCurrentUser,
};


import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
// import default style
import 'rsuite/dist/styles/rsuite-default.css'

// import login page
import { LoginPage } from './components/LoginPage/LoginPage.js';
import { RegisterPage } from './components/RegisterPage/RegisterPage';
import { HomePage } from './components/HomePage/HomePage';

const Login = () => (
  <LoginPage />
); 

const Register = () => (
  <RegisterPage />
); 

const Home = () => (
  <HomePage />
); 


function App() {
  return (
    <div>
      <Router>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/home" component={Home}></Route>
      </Router>
    </div>
  );
}

export default App;

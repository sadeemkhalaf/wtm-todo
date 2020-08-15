import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import default style
import 'rsuite/dist/styles/rsuite-default.css'
import { authenticationService } from './service/authCheck.service';
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

const RedirectTo = () => {
  return authenticationService.loginStatusValue ? <Redirect push from={'/login'} to={'/home'}/> : null
}

function App() {
  return (
    <div>
      <Router>
        {RedirectTo()}
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/home" component={Home}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

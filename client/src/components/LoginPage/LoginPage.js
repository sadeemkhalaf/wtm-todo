import React, { Component } from 'react';
import AuthService from '../../service/auth.service.js';
import AuthCheck, { authenticationService } from '../../service/authCheck.service';

import { Redirect } from 'react-router-dom';
// rsuite components
import { Button, Form, FormGroup, FormControl, ControlLabel, Schema, Divider } from 'rsuite';
// import default style
import 'rsuite/dist/styles/rsuite-default.css'
import './LoginPage.css';

// from validation
const { StringType } = Schema.Types;

const model = Schema.Model({
    email: StringType()
        .isEmail('Please enter a valid email address.')
        .isRequired('This field is required.'),
    password: StringType().isRequired('This field is required.')
});

export class LoginPage extends Component {
    _isMounted = false;
    subscriptions;

    constructor(props) {
        super(props)
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        AuthCheck.checkLogin();
        this.state = {
            email: '',
            password: '',
            loggedIn: authenticationService.loginStatusValue
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.subscriptions = authenticationService.isLoggedIn.subscribe((value) => this.setState({loggedIn: value}));
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.subscriptions.unsubscribe();
    }


    // onChange email and password
    onChangeEmail(value) {
        this.setState({ email: value })
    }

    onChangePassword(value) {
        this.setState({ password: value })
    }

    onSubmit = (e) => {
        const userObject = {
            email: this.state.email,
            password: this.state.password
        };

        AuthService.Login(userObject).then(() => {
            this.setState({loggedIn: true});
            this.redirect();
        });
        this.setState({ email: '', password: '' })
    }

    redirect() {
        if (this.state.loggedIn) {
            return (
                <Redirect push to="/home" />
            );
        }
    }

    RedirectTo () {
        return this.state.loggedIn ? <Redirect push to={'/home'}/> : <Redirect push to={'/login'}/>
      }

    render() {
        return (
            <div className="App">
                {this.RedirectTo()}
                <header className="App-header">
                    <Form layout="horizontal" onSubmit={this.onSubmit} model={model}>
                        <h4>Login</h4>
                        <FormGroup>
                            <ControlLabel srOnly>email</ControlLabel>
                            <FormControl type="email" placeholder="email" name="email" value={this.state.email} onChange={this.onChangeEmail} />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel srOnly>Password</ControlLabel>
                            <FormControl placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.onChangePassword} />
                        </FormGroup>

                        <div>
                        <Button type="submit">Login</Button>
                            <Divider vertical />
                            <a href="/register">Register</a>
                        </div>        
                    </Form>
                </header>
            </div>
        );
    }
}


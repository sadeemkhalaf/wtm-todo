import React, { Component } from 'react';
import AuthService from '../../service/auth.service.js';
// rsuite components
import { Button, Form, FormGroup, FormControl, ControlLabel, Schema, Divider } from 'rsuite';
// import default style
import 'rsuite/dist/styles/rsuite-default.css'
import './RegisterPage.css';

// from validation
const { StringType } = Schema.Types;

const model = Schema.Model({
    name: StringType()
        .isRequired('This field is required.'),
    email: StringType()
        .isEmail('Please enter a valid email address.')
        .isRequired('This field is required.'),
    password: StringType().isRequired('This field is required.')
});

export class RegisterPage extends Component {

    constructor(props) {
        super(props)
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    // onChange email and password
    onChangeName(value) {
        this.setState({ name: value })
    }

    onChangeEmail(value) {
        this.setState({ email: value })
    }

    onChangePassword(value) {
        this.setState({ password: value })
    }

    onSubmit(e) {
        const userObject = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        AuthService.Register(userObject);
        this.setState({ name: '', email: '', password: '' })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Form layout="horizontal" onSubmit={this.onSubmit} model={model}>
                    <h4>Register</h4>
                        <FormGroup>
                            <ControlLabel srOnly>name</ControlLabel>
                            <FormControl type="text" placeholder="name" name="name" value={this.state.name} onChange={this.onChangeName} />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel srOnly>email</ControlLabel>
                            <FormControl type="email" placeholder="email" name="email" value={this.state.email} onChange={this.onChangeEmail} />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel srOnly>Password</ControlLabel>
                            <FormControl placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.onChangePassword} />
                        </FormGroup>

                        <div>
                            <Button type="submit" href="/login">Register</Button>
                            <Divider vertical />
                            <a href="/login">Login</a>
                        </div>
                    </Form>
                </header>
            </div>
        );
    }
}


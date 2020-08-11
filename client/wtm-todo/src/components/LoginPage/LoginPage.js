import React, {Component} from 'react';
import AuthService from '../../service/auth.service.js';
// rsuite components
import { Button, Form, FormGroup, FormControl, ControlLabel } from 'rsuite';
// import default style
import 'rsuite/dist/styles/rsuite-default.css'

export class LoginPage extends Component {

    constructor(props) {
        super(props)
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    // onChange email and password
    onChangeEmail(value) {
        this.setState({email: value})
    }
    
    onChangePassword(value) {
        this.setState({password: value})
    }

    onSubmit(e) {
        // e.preventDefault()
        const userObject = {
            email: this.state.email,
            password: this.state.password
        };

        AuthService.Login(userObject);
        
        this.setState({ email: '', password: '' })
    }

    render () {
        return (
            <div>
          <Form layout="horizontal" onSubmit={this.onSubmit}>
            <FormGroup>
              <ControlLabel srOnly>email</ControlLabel>
              <FormControl type="email" placeholder="email" name="email" value={this.state.email} onChange={this.onChangeEmail} />
            </FormGroup>
      
            <FormGroup>
              <ControlLabel srOnly>Password</ControlLabel>
              <FormControl placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.onChangePassword}/>
            </FormGroup>
      
            <Button type="submit">Login</Button>
          </Form>
        </div>
        );
    }
}


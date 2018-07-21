import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Admin.css";
import axios from 'axios'


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      token: true
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

validateLogout() {
    return this.state.token === true
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


handleLogout = event => {
      localStorage.removeItem('token');
     window.location.reload()

     const t = Object.assign({}, this.state, {
        token: false

      })
     return this.setState(t)

   };

  handleSubmit = event => {
    event.preventDefault();

     const newValidation = Object.assign({}, this.state, {
        email: this.state.email,
        password: this.state.password
      
      });


    axios.post('http://calendar-booking-api.herokuapp.com/user/login', newValidation )
    .then(res => {

     localStorage.setItem('token', res.data.token);
     
      const tokenPresent = res.data.token
     
      if (tokenPresent != null) { const t = Object.assign({}, this.state, { 
       token: true

     });
      return this.setState(t)

      }
    })
    .catch(Error)     
    console.log('tokenPresent', this.state.token)

  }


  render() {
    return (
      <div className="board">
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <br />

            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <br />
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        
        </form>
          <Button
            block
            bsSize="large"
            disabled={!this.validateLogout()}
            type="button" onClick={this.handleLogout}
          >
            Logout
          </Button>
      </div>
      </div>
    );
  }
}
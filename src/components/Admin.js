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
      
      email_s: "",
      password_s: "",
      
      token: String,
      tokenPresent: Boolean
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

validateFormSignup() {
    return this.state.email_s.length > 0 && this.state.password_s.length > 0;
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

     const tk = Object.assign({}, this.state, {
        token: false

      })
         window.location.reload()
     return this.setState(tk)


   };

  handleSubmit = event => {
    event.preventDefault();

     const newValidation = Object.assign({}, this.state, {
        email: this.state.email,
        password: this.state.password

      });


    axios.post('https://calendar-booking-api.herokuapp.com/user/login', newValidation )
    .then(res => {

     localStorage.setItem('token', res.data.token);
     
      const tokenPresent = res.data.token
     
      this.setState(tokenPresent: true)

      })
    .catch(Error)     
    console.log('tokenPresent', this.state.tokenPresent)
    window.location.reload()
  }

   handleSubmitSignUp = event => {
    event.preventDefault();

     const newValidation = Object.assign({}, this.state, {
        email: this.state.email_s,
        password: this.state.password_s
      
      });


    axios.post('https://calendar-booking-api.herokuapp.com/user/signup', newValidation )
    .then(res => {

     console.log('SIGNUP DATA', res)

      })
    .catch(Error)    
    window.location.reload()
 

  }

  render() {
    return (
      <div className="board">
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
          <label>Login</label>
          <br />
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
         <Button
            block
            bsSize="large"
            disabled={!this.validateLogout()}
            type="button" onClick={this.handleLogout}
          >
            Logout
          </Button>
        </form>
         
      </div>

      
       <div className="Separator"></div>
      
        <div className="SignUp">
      
        <form onSubmit={this.handleSubmitSignUp}>
          <FormGroup controlId="email_s" bsSize="large">
          <label>Signup</label>
          <br />
            <ControlLabel>Email</ControlLabel>
            <br />

            <FormControl
              autoFocus
              type="email"
              value={this.state.email_s}
              onChange={this.handleChange}
            />
            
          </FormGroup>
          <FormGroup controlId="password_s" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <br />
            <FormControl
              value={this.state.password_s}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateFormSignup()}
            type="button" onClick={this.handleSubmitSignUp}
          >
            SignUp
          </Button>
        
        </form>
       
      </div>
      </div>
    );
  }
}
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
      token: Boolean
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

handleLogout = event => {
    event.preventDefault();
      sessionStorage.removeItem('token');
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




    axios.post('http://localhost:8081/user/login', newValidation )
    .then(res => {

      sessionStorage.setItem('token', res.data.token);
     
      const tokenPresent = res.data.token

      if (tokenPresent != null) { const t = Object.assign({}, this.state, { 
       token: true
     });
      return this.setState(t)
    }
    
    })
    .catch(Error) 

    console.log('e', this.state)


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
            // block
            bsSize="large"
            // disabled={!this.validateForm()}
            type="logout" onClick={this.handleLogout}
          >
            Logout
          </Button>
      </div>
      </div>
    );
  }
}
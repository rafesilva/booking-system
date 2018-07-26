import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Board.css";
import axios from 'axios'
const url = 'https://calendar-booking-api.herokuapp.com'
// const url = 'http://localhost:4000'


export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      

      email_f: "",
      token: String,
      tokenPresent: Boolean
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


   handleForgot = event => {
      
         window.location.href='/forgot';


   };

  handleSubmit = event => {

     const newValidation = Object.assign({}, this.state, {
        email: this.state.email,
        password: this.state.password

      });
    axios.post(url+'/user/login', newValidation )
    .then(res => {
      console.log('LOGIN DATA:', res)
 

       localStorage.setItem('uinfo', JSON.stringify(res))
     

      axios.get(url+'/user/'+res.data.id ).then( rr => {
        console.log('rr',rr)
        const r = rr 
        // localStorage.setItem('uinfo', JSON.stringify(r))
      })
    

       localStorage.setItem('token', res.data.token);
      
      this.setState({token: res.data.token, tokenPresent: true})

    


    })
    .catch(Error)  
                   window.location.reload();

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
            type="button" onClick={this.handleSubmit}
          >
            Login
          </Button>
        <Button
            
            bsSize="large"
            type="button" onClick={this.handleForgot}
          >
            Forgot
          </Button>

        </form>
         
      </div>

      </div>
    );
  }
}
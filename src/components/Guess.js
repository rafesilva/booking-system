import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Board.css";
import axios from 'axios'
const url = 'https://calendar-booking-api.herokuapp.com'
// const url = 'http://localhost:4000'


export default class Guess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      email_s: "",
      password_s: "",
  	  confirm_password_s: "",
      phone_s: Number,
      name_s: "",
      user_s: "",

      
      token: String,
      tokenPresent: Boolean,
	    isAdmin: Boolean

    };
  }


validateFormSignup() {
    return this.state.email_s.length > 0 && this.state.password_s.length > 0;
  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


   handleSubmitGuess = event => {
    event.preventDefault();

     const newValidation = Object.assign({}, this.state, {
        email: this.state.email_s,
        password: this.state.password_s,
	    name: this.state.name_s,        
	    phone: this.state.phone_s,
	    username: this.state.user_s

        
      });



    axios.post(url+'/user/signup', newValidation )
    .then(res => {

     console.log('SIGNUP DATA:', res)
      window.alert('YOU SUCCESFULLY SIGN UP')

      })
    .catch(Error)
  }

  render() {
    return (
      <div className="board">
      
        <div className="Guess">
      
           <form>
          <FormGroup controlId="name" bsSize="large">
          <label>Guess</label>
          <br />
               <ControlLabel>Name</ControlLabel>
            <br />

            <FormControl
              autoFocus
              type="string"
              value={this.state.name}
              onChange={this.handleChange}
            />
            
          </FormGroup>
         <FormGroup controlId="email" bsSize="large">
          <br />
               <ControlLabel>Email</ControlLabel>
            <br />

            <FormControl
              autoFocus
              type="string"
              value={this.state.email}
              onChange={this.handleChange}
            />
            
          </FormGroup>
          <FormGroup controlId="phone" bsSize="large">
          <br />
               <ControlLabel>Phone</ControlLabel>
            <br />

            <FormControl
              autoFocus
              type="string"
              value={this.state.phone}
              onChange={this.handleChange}
            />
            
          </FormGroup>
            <Button
            block
            bssize="large"
            disabled={!this.validateFormBook}
            type="button" onClick={this.handleSubmitGuess}
          >
            Book!
          </Button>
          
          </form>

       
       
      </div>
      </div>
    );
  }
}
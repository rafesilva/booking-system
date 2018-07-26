 
import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Checkout.css";
import axios from 'axios'

import Guess from '../components/Guess'

import Board from '../components/Board'
import SignUp from '../components/SignUpForm'
// import BookInfo from '../components/BookInfo';

// const url = 'https://calendar-booking-api.herokuapp.com'

const url = 'http://localhost:4000'


export default class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uk: { email: String, username:String  , name: String , phone: Number },

      userId:String,
      serviceId:String,  
      // email: "",
      // phone: Number,
      // name: "",

      // password:String,
      // confirm:String,
      token: String,
      tokenPresent: Boolean,
	    isAdmin: Boolean,
      shouldHide: Boolean

    };
  }
 componentDidMount(){
   const token = localStorage.getItem('token');
              
  if (token != null) { this.setState({shouldHide: false}) }

  
    const bkk = localStorage.getItem('binfo')
    const bk = JSON.parse(bkk)
    console.log('SERVICE INFO',bk)

    const ukk = localStorage.getItem('uinfo')

    const uk = JSON.parse(ukk)
    console.log('USER INFO',uk)

   
    this.setState({ userId: uk.data._id, serviceId: bk._id })
  
 
  }

validateFormSignup() {
    return this.state.email_s.length > 0 && this.state.password_s.length > 0;
  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }



  handleSubmitCheckOut = event => {
    event.preventDefault();

     const newValidationCheckOut = Object.assign({}, this.state, {
        userId: this.state.userId,
        serviceId: this.state.serviceId
        
      });

    axios.post(url+'/orders/checkout', newValidationCheckOut )
    .then(res => {

     console.log('BOOK DATA description:', res)
      window.alert('YOU HAVE BOOKED THAT THING')
       window.location.href='/user_board';
      })
    .catch(Error)
  }

  render() {

    const bkk = localStorage.getItem('binfo')
    const bk = JSON.parse(bkk)

    const ukk = localStorage.getItem('uinfo')

    const uk = JSON.parse(ukk)
    
    return (
      <div className="board">
      <div className={this.state.shouldHide ? 'hidden' : ""}>      
      <label>Booking Information</label>
      <div>{bk.productName}</div>
      <div>{bk._id}</div>
      <div>{bk.date}</div>
      <div>{bk.price}</div>
        <div  >{bk.time}</div>
        <div>{bk.duration}</div>
      <label>User Information</label>
      <div  >{this.state.uk.email}</div>
      <div  >{this.state.uk.username}</div>
      <div  >{this.state.uk.name}</div>
       <div  >{this.state.uk.phone}</div>



      </div>
      <div className="board">
     <div className={this.state.shouldHide ? '' : "hidden"}><Board /></div>
      <div className={this.state.shouldHide ? '' : "hidden"}><SignUp /></div>
            <div className={this.state.shouldHide ? '' : "hidden"}><Guess /></div>



            <div className={this.state.shouldHide ? 'hidden' : ""}>      
            <Button
            
            bssize="large"
            type="button" onClick={this.handleSubmitCheckOut}
          >
            Checkout!
          </Button></div>
</div>


      </div>

    );
  }
}
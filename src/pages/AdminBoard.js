import React from "react";
import "./AdminBoard.css";


import DayList from "../components/DayList";
import UserList from "../components/UserList";
import Form from "../components/Form";
import Board from "../components/Board";

import axios from "axios"
// const url = 'https://calendar-booking-api.herokuapp.com'
const url = 'http://localhost:4000'

export default class AdminBoard extends React.Component {

  state = {
    count: '',
    days: [],
    users: [],
    shouldHide: Boolean,
  }

    
 
    componentWillMount() {
             const token = localStorage.getItem('token');
              
              if (token != null) { this.setState({shouldHide: false}) }

              console.log('token', token) 

// const token = this.state.token

  let config = {
   
    headers: { 'Access-Control-Allow-Origin': '*',
     'Content-Type':'application/json',
      'Authorization':'Bearer '+token  },
  }      


    axios.get(url+'/dates', config)
    .then( response => {
      const newDays = response.data.days.map((day, i) => {
        return {
          _id: day._id,
          date: day.date,
          month: day.month,
           year: day.year,
           time: day.time.time,
           description: day.time.description,
           duration: day.time.duration
           
      };
    });

      const newState = Object.assign({}, this.state, {
        days: newDays
    });

      this.setState(newState);
   })

    .catch(error => console.log('BAD DAYS', error))
   
axios.get(url+'/user', config)
    .then( response => {
      const newUsers = response.data.users.map((user, i) => {
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
           phone: user.phone,
           username: user.username
          
           
      };
    });

      const newStateUsers = Object.assign({}, this.state, {
        users: newUsers
    });

      this.setState(newStateUsers);
   })

    .catch(error => console.log('BAD USERS', error))
   }




    render() {

    return (
     
   
  <div key={this.board} className='board'>

  <div className={this.state.shouldHide ? '' : "hidden"}><Board key={this.admin}/></div>

    <div className={this.state.shouldHide ? 'hidden' : "board"}>
    <br />
 
      <div className={this.state.shouldHide ? 'hidden' : "Form"}>
      <br />

      <div className={this.state.shouldHide ? 'hidden' : ""}><Form key={this.form}/></div>
      <br />
      <div className={this.state.shouldHide ? 'hidden' : ""}><legend> USERS </legend>
       <UserList key={this.user} users={this.state.users} /></div>
<br />
      <div className={this.state.shouldHide ? 'hidden' : ""}><legend> APPOINTMENTS </legend>
      <DayList key='days' days={this.state.days} /></div>
         </div>
         <div>
         
    </div>      
    </div>
  </div>
  
    );
  }
}

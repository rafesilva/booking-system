import React from "react";
import "./App.css";

import DayList from "./components/DayList";
import Form from "./components/Form";
import Admin from "./components/Admin";
import axios from "axios"
const url = 'https://calendar-booking-api.herokuapp.com'
// const urlLocal = 'http://localhost:4000/dates'

export default class App extends React.Component {

  state = {
    count: '',
    days: [],
    shouldHide: Boolean,
  }

    handleLogout = event => {
      localStorage.removeItem('token');
     window.location.reload()

     const tk = Object.assign({}, this.state, {
        token: false

      })
     return this.setState(tk)

   };
 
    componentDidMount() {
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

    .catch(error => console.log('BAD', error))
   }

    render() {

    return (
   
  <div key={this.state} className='board'>

<div className={this.state.shouldHide ? 'login' : "hidden"}>
     <Admin /></div>

    <div className={this.state.shouldHide ? 'hidden' : "board"}>
      <div className='logout'>
       <button bsSize="large" type="button" onClick={this.handleLogout}>Logout</button>

     </div>
    <br />
 
 
      <div className="Form">
       
      <br />

      <Form />
   
      
      <br />

      <DayList key={this.i} days={this.state.days} />
         </div> 
    </div>
  </div>
  
    );
  }
}

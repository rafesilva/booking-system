import React from "react";
import "./App.css";

import DayList from "./components/DayList";
import Form from "./components/Form";
import Admin from "./components/Admin";
import axios from "axios"
// const url = 'http://calendar-booking-api.herokuapp.com/dates'
// const urlLocal = 'http://localhost:4000/dates'

export default class App extends React.Component {

  state = {
    count: '',
    days: [],
  }
 
    componentDidMount() {
             const token = localStorage.getItem('token');
            
// const token = this.state.token

  let config = {
   
    headers: { 'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Bearer '+token  },
  }      
console.log('token', token)

    axios.get('http://calendar-booking-api.herokuapp.com/dates', config)
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

  <span key={this.state} className="DayList">
    <ul className="board">
    <br />

      <Admin />
      <span className="Form">
       <span className="FormFiels">

      <br />
      <Form />
      </span>
      </span>  
      <br />
      <DayList  key={this.i} days={this.state.days} />
        
    </ul>
  </span>
  
    );
  }
}

import React from "react";
import "./App.css";

import DayList from "./components/DayList";
import Form from "./components/Form";

import axios from "axios"
// const url = 'https://calendar-booking-api.herokuapp.com/dates'
const urlLocal = 'http://localhost:8081/dates'

export default class App extends React.Component {

  state = {
    count: '',
    days: []
  }
 
    componentDidMount() {
    axios.get(urlLocal)
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

  <div key={this.state} className="DayList">
    <ul className="board">
    <br />
      <div>Admin BOARD</div>
      <div className="Form">
       <div className="FormFiels">
      <br />
      <Form />
      </div>
      </div>  
      <br />
      <DayList  key={this.i} days={this.state.days} />
        
     
    </ul>
  </div>
  
    );
  }
}

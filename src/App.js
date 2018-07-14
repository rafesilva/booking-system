import React from "react";
import "./App.css";

import DayList from "./components/DayList";
import Form from "./components/Form";


import axios from "axios"
const url = 'https://calendar-booking-api.herokuapp.com/dates'
const urlLocal = 'https://localhost:8081/dates'

export default class App extends React.Component {

  state = {
    count: '',
    days: []
  }
     


    componentDidMount() {
    axios.get(url)
    .catch(error => console.log('BAD', error))
    .then( response => {
      const newDays = response.data.days.map((day, d) => {
        return {
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
   }
    render() {

    return (
      <div className="DayList">
          <ul>

        <DayList key={this.d} days={this.state.days} />
  <div>

          <Form />


      </div>

        
        </ul>
      </div>
    );
  }

}

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import DayList from "./components/DayList";

import axios from "axios"

class App extends React.Component {

  state = {
    count: '',
    days: []
  }
     

  render() {

    return (
      <div className="DayList">
          <ul>
        {console.log('DAYS', this.state.days)}
        {console.log('COUNT', this.state.count)}

        <DayList days={this.state.days} />


        
        </ul>
      </div>
    );
  }
    componentDidMount() {
    axios.get(`http://localhost:3001/dates`)
    .catch(error => console.log('BAD', error))
    .then( response => {
      const newDays = response.data.days.map(day => {
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

      // console.log('GOOD', response.data.days)
      // this.setState( {days: response.data.days, count: 'Hello' })
     })
  }
}
export default App;
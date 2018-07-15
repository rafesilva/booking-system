import React from "react";
import "./Day.css";
import axios from "axios";
// import PropTypes from "prop-types";
   

function Day(props) {
    
function onDelete(e) {

        e.preventDefault();

      const dateId = props._id; 
      const headers = {
        'Access-Control-Allow-Origin': '*'
      }
    
  axios.delete('http://localhost:8081/dates/' + dateId, headers )
.then(res => 
   console.log('res', res))
.catch()
}
  return (




 <div className="day">
 <label>ID: </label>
 <div>{props._id}</div>
 <br />
 <label>DAY: </label>
   <div>{props.date}</div>
   <label>MONTH: </label>
    <div>{props.month}</div>
      <label>YEAR: </label>
          <div>{props.year}</div>
          <br />
          <label>TIME: </label>
          <div>{props.time}</div>
          <label>DURATION: </label>
          <div>{props.duration}</div>
          <label>DESCRIPTION: </label>
          <div>{props.description}</div>
 
          <button onClick={onDelete} >Delete</button>

 </div>
 );
}

/// Day.propTypes = {
//   month: PropTypes.integer.isRequired
//   };

export default Day;
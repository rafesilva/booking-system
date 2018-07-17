import React from "react";
import "./Day.css";
import axios from "axios";
// import PropTypes from "prop-types";
   

function Day(props) {
    
function onDelete() {

      const dateId = props._id; 
      const headers = {
        'Access-Control-Allow-Origin': '*'
      }
      axios.delete('http://localhost:8081/dates/' + dateId, headers )
.then(res => 
   console.log('Delete', res))
.catch(Error)
}

  return (



 <div className="day">
            <br />
 <label>DAY: </label>
   <div>{props.date}</div>
   <label>MONTH: </label>
    <div>{props.month}</div>
      <label>YEAR: </label>
          <div>{props.year}</div>
          <br /> <br />
          <label>TIME: </label>
          <div>{props.time}</div>
          <label>DURATION: </label>
          <div>{props.duration}</div>
          <label>DESCRIPTION: </label>
          <div>{props.description}</div>
           <br />

          <button onClick={onDelete} >Delete</button>
           <br />

          <label>DAY ID </label>
          <div>{props._id}</div>
 <br />

 </div>

 );
}

/// Day.propTypes = {
//   month: PropTypes.integer.isRequired
//   };

export default Day;
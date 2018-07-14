import React from "react";
import "./Day.css";

// import PropTypes from "prop-types";


function Day(props) {
  return (
 <div className="day">
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

 </div>
 );
}

/// Day.propTypes = {
//   month: PropTypes.integer.isRequired
//   };

export default Day;
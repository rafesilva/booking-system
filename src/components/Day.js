import React from "react";
import "./Day.css";

import PropTypes from "prop-types";


function Day(props) {
  return (
 <div className="day">
   <span>{props.date}</span>
      <div>{props.month}</div>
          <div>{props.year}</div>
          <div>{props.time}</div>
          <div>{props.duration}</div>
          <div>{props.description}</div>



 </div>
 );
}

// Day.propTypes = {
//   month: PropTypes.integer.isRequired
//   };

export default Day;
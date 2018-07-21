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
      axios.delete('https://calendar-booking-api.herokuapp.com/dates/'+ dateId, headers )
      .then(res => {
         console.log('Delete', res)
         timeout(100);
         return window.location.reload();      
      })
      .catch(console.log('Errro',Error))

}

  return (

 <div className="day">
            <br />
 <label>Day </label>
   <div className="props">{props.date}</div>
   <label>Month </label>
    <div className="props">{props.month}</div>
      <label>Year </label>
          <div className="props">{props.year}</div>
          <br /> <br />
          <label>Time </label>
          <div className="props">{props.time}</div>
           <br />
          <label>Duration </label>
          <div className="props">{props.duration}</div>
           <br />
          <label>Description </label>
          <div className="props">{props.description}</div>
           <br />

          <button onClick={onDelete} >Delete</button>
           <br />

          <label>DAY ID </label>
          <div className="props">{props._id}</div>
 <br />

 </div>

 );
}

/// Day.propTypes = {
//   month: PropTypes.integer.isRequired
//   };

export default Day;
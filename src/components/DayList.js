import React from "react";

// import the Contact component
import Day from "./Day";


function DayList(props) {
  return (
    <div>
    {console.log('PRORP DAY', props.days)}
      {props.days.map(day => <Day key={day._id} date={day.date} month={day.month} year={day.year}
      time={day.time} duration={day.duration} description={day.description} />)}
     </div> 
  ); 
} 

export default DayList;
import React from "react";
import "./User.css";
import axios from "axios";
// import PropTypes from "prop-types";
  
// const url = 'http://localhost:4000'
 
const url = 'https://calendar-booking-api.herokuapp.com'
function User(props) {
    
function onDelete() {
      

      const token = localStorage.getItem('token');

      const userId = props._id; 
      let config = {
   
    headers: { 'Access-Control-Allow-Origin': '*', 
    'Content-Type':'application/json', 
    'Authorization':'Bearer '+token  },
  }
      axios.delete(url+'/user/'+userId, config )
      .then(res => {
         window.alert('USER Deleted', res)
         return window.location.reload();      
      })
      .catch(Error)

}

  return (

 <div className="user">
            <br />
 <label>User </label>
   <div className="props">{props.username}</div>
   <label>Email </label>
    <div className="props">{props.email}</div>
      <label>Name </label>
          <div className="props">{props.name}</div>
          <br /> <br />
          <label>Phone </label>
          <div className="props">{props.phone}</div>
           <br />
          
          <button onClick={onDelete} >Delete USER</button>
           <br />

          <label>USER_ID </label>
          <div className="props">{props._id}</div>
 <br />

 </div>

 );
}

/// Day.propTypes = {
//   month: PropTypes.integer.isRequired
//   };

export default User;
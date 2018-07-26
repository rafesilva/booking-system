import React from "react";
import User from "./User";

function UserList(props) {

  return (

 <div>
      {
              props.users.map((user, u) => 

        <User _id={user._id} 
        username={user.username} 
        name={user.name} 
        phone={user.phone} 
        email={user.email}/>

      )}
        
     </div> 
  ); 
} 

export default UserList;
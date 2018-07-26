import React from "react";
import "./UserBoard.css";


import Board from "../components/Board";

import axios from "axios"
// const url = 'https://calendar-booking-api.herokuapp.com'
const url = 'http://localhost:4000'

export default class UserBoard extends React.Component {

  state = {
    userId: String,
    shouldHide: Boolean,
    orders: []
  }


 
    componentWillMount() {
    const newUserId = localStorage.getItem('uinfo');

 

    const uid = JSON.parse(newUserId)

      const newState = Object.assign({}, this.state, {
        userId: uid.data._id 
    });

      this.setState({userId: uid.data._id});
   console.log(this.state.userId)
   }




    render() {

         const token = localStorage.getItem('token');

            let config = {
      
                    headers: { 'Access-Control-Allow-Origin': '*',
                     'Content-Type':'application/json',
                      'Authorization':'Bearer '+token  },
                  }      
 axios.get(url+'/orders/board/'+this.state.userId).then(res => {res

 
  console.log(res)
  return localStorage.setItem('orders', JSON.stringify(res))

 })

 const orders = localStorage.getItem('orders')   
 console.log('orders', orders) 
const ordersParse = JSON.parse(orders)
 console.log(ordersParse.data.doc)        
  const order = ordersParse.data.doc.map( doc => { 
    return doc
    })
    return (
 ordersParse.data.doc.map( doc => 
  
   
  <div>{doc._id} | {doc.serviceId.name}} | {doc.serviceId.description} | {doc.serviceId.duration} | {doc.serviceId.price}</div>
   )

    )
  }

}



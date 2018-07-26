
import React, { Component } from 'react';
import { Row, Col, Button, CardBody, Card} from 'reactstrap';
import axios from 'axios';
// const url = 'http://localhost:4000'
const url = 'https://calendar-booking-api.herokuapp.com'

class BookInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // day: "",
            // month: "",
            // year: "",
            // duration: "",
            selectedTime: "Not Selected",
            isActive: true, 
            collapse: false
            //productName: "",
            //price:""
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    change(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    onSubmit(){
        this.setState({
            day: this.props.day,
            month: this.props.month,
            year: this.props.year,
            duration: this.props.duration,
            timeslots: this.props.timeslots
        })
        // e.preventDefault()
        this.props.onSubmit(this.state);
    }
    
    selectTime(e){
        this.setState({
            selectedTime: e.target.value,
            isActive: false
        })
    }
    
    onChangeDay(){




    }

    postOrder(){
        const token = localStorage.getItem('token');

        let config = {
          headers: { 'Content-Type':'application/json', 'Authorization':'Bearer '+token  },
        }   
          let newData = {
            _id: this.props._id,
              productName: this.props.productName,
              price: this.props.price,
              date:`${this.props.day}/${this.props.month}/${this.props.year}`,
              time:this.state.selectedTime,
              duration: this.props.duration
          }
                localStorage.setItem('binfo', JSON.stringify(newData))

          
 axios.post(url+'/times', newData, config)
        .then((res) => { 

          console.log('state time', newData)
          console.log('Time created: ', res.data);

          const newTime = Object.assign({}, this.state, { 
            timeId: res.data.createdTime._id,
            date: this.state.date,
            month: this.state.month, 
            year: this.state.year
          })


          axios.post(url+'/dates', newTime)
          .then((res) => { 

            console.log('Data created: ', res.data);
            window.alert('Booked', res)
            return window.location.href='/checkout'
 

          })
          .catch((err) => {console.log('err',err)})
        })
        

        .catch((err) => 
          {console.log('err',err)

        });
      }
        



render(){
    
    
    let day = this.props.day
    let timeslot = this.props.timeslot
    let month = this.props.month
    let year = this.props.year
    let duration = this.props.duration
    let id = this.props._id

    let productName = this.props.productName
    let price = this.props.price
    let available = this.props.available


    
    
    
    return (
    <Card>

        <h2>Booking Confirmation</h2>
            <CardBody>

            <Row>
                <Col style={{textAlign: 'left'}}>
                    <p><strong>ID:</strong> {id}</p>
                    <p><strong>Product :</strong> {productName}</p>
                    <p><strong>Amount :</strong> {price}</p>
                    <p><strong>Date :</strong> {day}/{month}/{year}</p>
                    <p><strong>Selected Duration :</strong> {duration}</p>
                    <p><strong>Selected Timeslot :</strong> {this.state.selectedTime}</p>
                    <Button onClick={f => this.postOrder()} color="success" disabled={this.state.isActive}>Book Now</Button>
                </Col>
            
                <Col style={{textAlign: 'left'}}>
                    <p>{available}</p>
                    {timeslot.map(x => 
                        <Button outline color="secondary" style={{width:100}} value={x}  onClick={e => this.selectTime(e)}> {x} </Button>
                    )}
                </Col>
                
            </Row>
            </CardBody>
    
    </Card>   
    )
}
}





export default BookInfo;




// {
//     productName: this.props.productName,
//     price: this.props.price,
//     date:`${this.props.day}/${this.props.month}/${this.props.year}`,
//     time:this.state.selectedTime,
//     duration: this.props.duration
// }
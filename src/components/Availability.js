   import React from 'react';
    import axios from 'axios';

export default class Ava extends React.Component { 

constructor(props) {

super(props)

  this.state = {
        date: 15,
        month: 10,
        year: 2018,
        used: []

       };



        axios.get('http://localhost:8081/dates/' + '15/'  + '10/' + '2018' )
        .then( (res) => {   

          const test = res.data.day.map(day => day.time.time)
       
        const timeUsed = Object.assign({}, this.state, {
        used: test }) 

        this.setState(timeUsed);
            })

           
        .catch(Error)
        
        axios.get('http://localhost:8081/dates/')
        .then( (res) => {res.data})
        
  
}

 onChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value });
       
      }

      render () {
  
        const used = this.state.used
        console.log(used)
        const arrayTime = 10;

        const array = Array.apply(null, {length: arrayTime}).map( Number.call, Number )
        console.log(array)
        
        const isTimeUsed = ((time, a) => {
            let times = time.map(t => {return t})
            let as = a.map(s => {return s})

                
            return as
        })


        console.log('timeused', isTimeUsed(used, array))
        


        return ( 
            <div>    
                <select value={this.state} onChange={this.onChange}>   
            {array.map(time => 
        
                 <option value="time">{time}</option>
            
        
                )}
              </select>
              </div>
            )
        }

    }     

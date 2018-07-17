   import React from 'react';
    import axios from 'axios';

export default class Ava extends React.Component { 

constructor(props) {

super(props)

  this.state = {
        date: Number,
        month: Number,
        year: Number,
        used: []

       };


       console.log('test', this.state)
        axios.get('http://localhost:8081/dates/' + this.state.date + "/"  + this.state.month + "/" + this.state.year )
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

        console.log('TIMES USED', used)


        const arrayTime = 12;
        const array = Array.apply(null, {
            length: arrayTime
        }).map( Number.call, Number )


        const timesUsed = array.filter((times) => {
              return used.indexOf(times) === -1;
                });

    
       console.log('Available TIMES: ', timesUsed)


        console.log(this.state.date)        

        return ( 
            <div>    
                <select value={this.state} onChange={this.onChange}>   
            { timesUsed.map(time => 
        
                 <option value="time">{time} pm or am</option>
            
                )}
              </select>
              </div>
            )
        }

    }     

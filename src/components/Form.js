import React from 'react';
    import axios from 'axios';

    export default class Form extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          time: Number,
          duration: Number,
          description: String,
          date: Number,
          month: Number,
          year: Number,
          dayId: String

        };
     }

      onChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value });
       
      };
  
      onSubmit = e => {

        e.preventDefault();

       const newData = Object.assign({}, this.state, {
        time: this.state.time,
        duration: this.state.duration, 
        description: this.state.description
      
      });

      const headers = {
        'Access-Control-Allow-Origin': '*'
      }

        axios.post('http://localhost:8081/times', newData, headers)
        .then((res) => { 
          const newTime = Object.assign({}, this.state, { 
          timeId: res.data.createdTime._id,
          date: this.state.date,
          month: this.state.month, 
          year: this.state.year

        });
                                axios.post('http://localhost:8081/dates', newTime, headers)
                                  .then((res) => { 

                                    console.log('Data created: ', res.data);

                                  }).catch((err) => {console.log('err',err)})
                                })

        .catch((err) => {console.log('err',err)

      });

    }

   onDelete = e => {

   axios.delete('http://localhost:8081/times', {params: { dateId: this._id }})
     
  }

      render () {
        return (

          <form onSubmit={this.onSubmit}>
            <label>TIME</label>
              <input 
              name="time"
              type="number" 
              value={this.state.time} 
              onChange={this.onChange} />

            <label>DURATION</label>
              <input 
              name="duration"
              type="number" 
              value={this.state.duration} 
              onChange={this.onChange} />

            <label>DESCRIPTION</label>
              <input 
              name="description"
              type="text" 
              value={this.state.description} 
              onChange={this.onChange} />

            <label>DATE</label>
               <input 
              name="date"
              type="number" 
              value={this.state.date} 
              onChange={this.onChange} />
              
            <label>MONTH</label>
              <input 
              name="month"
              type="number" 
              value={this.state.month} 
              onChange={this.onChange} />
              
            <label>YEAR</label>
              <input 
              name="year"
              type="number" 
              value={this.state.year} 
              onChange={this.onChange} />

            <input type="submit" 
            value="Submit" />

      </form>

        )
      }
      
    }


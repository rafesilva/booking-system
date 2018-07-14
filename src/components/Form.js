import React from 'react';
    import axios from 'axios';

    export default class Form extends React.Component {
     
       state = {
          time: 12,
          duration: 1,
          description: 'Jennys Haircut'

        };
      
      onChange = e => {
     
        this.setState({time: e.target.value, description: e.target.value, duration: e.target.value, });
        console.log('event', e);
      };

onSubmit = e => {

        e.preventDefault();

       const newData = Object.assign({}, this.state, {
        duration: this.state.duration, 
        description: this.state.description});


      const headers = {
        'Access-Control-Allow-Origin': '*'}
      console.log('times', newData);
       console.log('headers', headers);



        axios.post('http://localhost:8081/times', newData, headers)
        .then((res) => { const newTime = Object.assign({}, this.state, { 
          timeId: '5b493bd9de99a87746600c92',
          date: 15,
          month: 10,
          year: 2018})
         console.log(newTime)
                                  axios.post('http://localhost:8081/dates', newTime, headers)
                          .then((res) => { 


                              console.log('RESULT date', res);
                              console.log('RESULT DATA date', res.data);
                          }).catch((err) => {console.log('err',err)})


            console.log('RESULT', res);
            console.log('RESULT DATA', res.data);
        }).catch((err) => {console.log('err',err)

      })
      }

      render() {
        return (
          <form onSubmit={this.onSubmit}>
            <input type="number" time="time" onChange={this.onChange} />
            <input type="number" duration="duration"  onChange={this.onChange} />
            <input type="text" description="description" onChange={this.onChange} />
            <button type="submit">Submit</button>
          </form>
        );
      }
    }


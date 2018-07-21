    import React from 'react';
    import axios from 'axios';
    import "./Form.css"

   const url = 'https://calendar-booking-api.herokuapp.com'
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
          dayId: String,
          used: [],
          token: String
        };

     }

      onChange = e => {
        
  const token = localStorage.getItem('token');
            
// const token = this.state.token
//  console.log('token', this.state.token)

  let config = {
   
    headers: { 'Content-Type':'application/json', 'Authorization':'Bearer '+token  },
  }      

        const value = e.target.value;

        const name = e.target.name;

        if (name === 'date') { this.setState({date: value} );} 
        if (name === 'month') { this.setState({month: value} );}
        if (name === 'year') { this.setState({year: value} );} 
         
           axios.get(url+'/dates/' + this.state.date + "/"  + this.state.month + "/" + this.state.year, config )
        .then( (res) => {   

        const times = res.data.day.map(day => day.time.time)
       
        const timeUsed = Object.assign({}, this.state, {
        used: times }) 
         this.setState(timeUsed);

           })
        .catch(Error)
                 
          console.log('object name', e.target.name)
         console.log('object value', e.target.value)
      };

    onChangeForm = e => {
      
           const target = e.target;
            const value = target.value;
              const name = target.name;
                  this.setState({ [name]: value });
        }

       // onChangeTime = e => {

       //  const target = e.target
       //  const value = target.value
       //  this.setState({time: value});

       //  }
  
     onSubmit = e => {

    e.preventDefault();
       const token = localStorage.getItem('token');

      let config = {
   
    headers: {  'Access-Control-Allow-Origin': '*', 
    'Content-Type':'application/json', 
    'Authorization':'Bearer '+token  },
  }    
        const newData = Object.assign({}, this.state, {
        time: this.state.time,
        duration: this.state.duration, 
        description: this.state.description
        
      });
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


                                  }).catch((err) => {console.log('err',err)})
                           })
        .catch((err) => 
          {console.log('err',err)
     
      });
    }

   onDelete = e => {

   axios.delete(url+'/times', {params: { dateId: this._id }})
     
  }

  componentDidMount() {

     const token = localStorage.getItem('token');
    

  let config = {
   
    headers: { 'Access-Control-Allow-Origin': '*', 
    'Content-Type':'application/json', 
    'Authorization':'Bearer '+token  },
  }      

    axios.get(url+'/dates', config )
    .then( response => {
      const newDays = response.data.days.map((day, d) => {
        return {
          _id: day._id,
          date: day.date,
          month: day.month,
           year: day.year,
           time: day.time.time,
           description: day.time.description,
           duration: day.time.duration
        };
      });

      const newState = Object.assign({}, this.state, {
        days: newDays
      });

      this.setState(newState);
     })
    .catch(error => console.log('FORM COULD NOT GET', error))

    
   }

      render () {

        const used = this.state.used
        

        const arrayTime = 12;
        const array = Array.apply(null, {
            length: arrayTime
        }).map( Number.call, Number )

        const timesUsed = array.filter((times) => {
              return used.indexOf(times) === -1;
                });

          ///DAY
        const arrayDay = 32;
        const arrayD = Array.apply(null, {
            length: arrayDay
        }).map( Number.call, Number )
     

          ///MONTH
        const arrayMonth = 13;
        const arrayM = Array.apply(null, {
            length: arrayMonth
        }).map( Number.call, Number )

        const arrayYear = function range(start, count) {
      return Array.apply(-1, Array(count))
        .map(function (element, index) { 
          return index + start;  
      });
    }
      
      console.log('Schedule TIMES', used)

        console.log('Available TIMES: ', timesUsed)

            console.log('Available States: ', this.state)


            
        return (
          
          <form className='form' >

           
            <label className="label">Date</label>
              
                <select className="select" value={this.state.value} name="date" onChange={this.onChange}>  

            {arrayD.map(dates => 
                 <option value={dates} > {dates} </option>
            
                )}          

              </select>
                         <br />
            <label className="label">Month</label>
              
                <select className="select" value={this.state.value} name="month" onChange={this.onChange}>  

            {arrayM.map(months => 
                 <option value={months} >{months} </option>
            
                )}           

              </select>
                         <br />

               <label className="label">Year</label>
              
                <select className="select" value={this.state.value} name="year" onChange={this.onChange}>  

            {arrayYear(2018,3).map(years => 
                 <option value={years} > {years} </option>
            
                )}           

              </select>
                  <br />
            <label className="label">Time</label>
              
                <select className="select" value={this.state.value} name="time" onChange={this.onChange}>  

            {timesUsed.map(times => 
                 <option value={times} > {times} </option>
            
                )}           

              </select>
           
           <br />

            <label className="label">Duration</label>
              <input 
              name="duration"
              type="number" 
              value={this.state.duration} 
              onChange={this.onChangeForm} />

           <br />

            <label className="label">Description</label>
              <input 
              name="description"
              type="text" 
              value={this.state.description} 
              onChange={this.onChangeForm} />
           <br />

            <input className="submit" type="submit" 
            value="Book" onClick={this.onSubmit}/>

<br />
      </form>

        )
      }
      
    }


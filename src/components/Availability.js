//    import React from 'react';
//     import axios from 'axios';

// export default class Ava extends React.Component { 

// constructor(props) {

// super(props)

//   this.state = {
//         date: 15,
//         month: 10,
//         year: 2018,
//         used: []

//        };
// }

//       render () {
  
//         const used = this.state.used

//         console.log('TIMES USED', used)


//         const arrayTime = 12;
//         const array = Array.apply(null, {
//             length: arrayTime
//         }).map( Number.call, Number )


//         const timesUsed = array.filter((times) => {
//               return used.indexOf(times) === -1;
//                 });

    
//        console.log('Available TIMES: ', timesUsed)


//         console.log(this.state.date)        

//         return ( 
//             <div>    
//                 <select value={this.state.time}>   
//             { timesUsed.map(time => 
        
//                  <option value="time">{time} pm or am</option>
            
//                 )}
//               </select>
//               </div>
//             )
//         }

//     }     

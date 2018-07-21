// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import { createStore } from "redux";

const reducer = (state, action) => {
	switch (action.type) {
		case "ADD":
			break;
		case "SUBSTRACT":
			break;
	}
return state;
};


const store = createStore(reducer, 1);
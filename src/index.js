/* eslint react/prop-types: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './index.css';
import './App.css';
// import registerServiceWorker from './registerServiceWorker';

import Navigation from './components/Navigation';

ReactDOM.render(
	<Navigation />,
  document.getElementById('root')
);
//registerServiceWorker();

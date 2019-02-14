import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { FormErrors } from './FormErrors';
import './Form.css';
import {
BrowserRouter as Router,
Route,
Switch,
Redirect,
NavLink,
HashRouter
} from 'react-router-dom';
class Logout extends Component {
  constructor (props) {
    super(props);
    this.loggedIn = sessionStorage.getItem('user');
  }
   componentWillMount() {
    sessionStorage.removeItem('user');
    window.location.reload();
    this.props.history.push("/login") 

  }
  render() {
    if(!this.loggedIn) {
           return <Redirect to='/login'/>;
       }
    return  <Redirect to='/login'/>;
  }
}

export default Logout;   

import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import logo from '../logo.svg';
import { FormErrors } from './FormErrors';
import './Form.css';
import {
// BrowserRouter as Router,
// Route,
// Switch,
Redirect,
// NavLink,
// HashRouter
} from 'react-router-dom';
class Login extends Component {
  constructor (props) {
    super(props);
    this.loggedIn = sessionStorage.getItem('user');
    this.state = {
      forms:[],
      email: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false,
      errors:''
    }
  } 

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
        default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid
      }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }
  onSubmit = (e) => {
    e.preventDefault();
     const { email, password } = this.state;
    console.log(email);
    axios.post('/api/form/match', { email, password })
      .then((result) => {
        if(result.data.data==="Matching")
        {
          sessionStorage.setItem('user', email);
          window.location.reload();
          this.props.history.push("/")
        }
        else{
          this.setState({ errors: result.data.data })
        }
      });
  }
  render () {
  	 // const { email, password } = this.state;
     if(this.loggedIn) {
           return <Redirect to='/'/>;
       }
    return (
      <div className="row">
        <div className="col-md-3">
        </div>
        <div className="col-md-6">
          <form className="demoForm" onSubmit={this.onSubmit}>
            <h2>Sign up</h2>
            <div className="panel panel-default">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <div className='form-group ${this.errorClass(this.state.formErrors.email)}'>
              <label htmlFor="email">Email address</label>
              <input type="email" required className="form-control" name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleUserInput}  />
            </div>
            <div className='form-group ${this.errorClass(this.state.formErrors.password)}'>
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleUserInput}  />
            </div>
            <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Sign up</button>
            <span className="errors">{this.state.errors}</span>
          </form>
        </div>
        <div className="col-md-3">
        </div>  
      </div> 
    )
  }
}
export default Login;
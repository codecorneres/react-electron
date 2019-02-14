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
// import { connect } from 'react-redux';

class Register extends Component {
  constructor (props) {
    super(props);
    this.loggedIn = sessionStorage.getItem('user');
    this.onSubmit = this.onSubmit.bind(this);
     //this.fileInput = React.createRef();
    this.state = {
      forms:[],
      email: '',
      password: '',
      selectedFile:'',
      fileInput: React.createRef(),
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false,
      errors: ''
    };

  }
   componentDidMount() {
    axios.get('/api/form')
      .then(res => {
        this.setState({ forms: res.data });
      });
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
    
    console.log(this.state.email);
    console.log(this.state.file);
    
     const { email, password, file} = this.state;
    axios.post('/api/form', { email, password, file})
      .then((result) => {
        if(result.data.data ==="The email address you have entered is already registered"){
           this.setState({ errors: result.data.data })
        }
        else{
           this.componentDidMount()
        }
       
      });
  }
  delete(id){
    console.log(id);
    axios.delete('/api/form/'+id)
      .then((result) => {
        this.componentDidMount()
      });
  }


handleUploadFile = (event) => {
  /*this.state.selectedFile = event.target.files[0];
  console.log(this.state.selectedFile.name);*/
  const data = new FormData()
  data.append('file', event.target.files[0])
  data.append('name', 'some value user types')
  data.append('description', 'some value user types')
  axios.post('/api/form/file', data).then( 
  (response) => { console.log(response) },
  (error) => { console.log(error) }
);
  }

  render () {
    // const { email, password } = this.state;
    if(this.loggedIn) {
           return <Redirect to='/'/>;
       }
    return (
    	<div className="row">
      	<div className="col-md-6 logodv">
        <div className="table-responsive">
          <table className="table table-stripe">
            <thead>
              <tr>
                <th>Id</th>
                <th>Email</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.forms.map(form =>
                <tr>
                  <td>{form._id}</td>
                  <td>{form.email}</td>
                  <td>{form.password}</td>
                  <td><button onClick={this.delete.bind(this,form._id)} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i>
              Delete</button></td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
      	</div>
        <div className="col-md-1"></div>
      	<div className="col-md-4">
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
      </div> 
    )
  }
}
export default Register;
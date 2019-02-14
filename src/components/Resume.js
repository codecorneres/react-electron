import React, { Component } from 'react';
import axios from 'axios';
import { FormErrors } from './FormErrors';
import './Form.css';
import {
Redirect,
} from 'react-router-dom';

import Checkbox from './Checkbox';
const items = [
  'Cricket',
  'football',
  'books',
];
class Resume extends Component {
		constructor (props) {
	    super(props);
	    this.loggedIn = sessionStorage.getItem('user');
	    this.onSubmit = this.onSubmit.bind(this);
	    this.onChange = this.onChange.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	    this.state = {
	      forms:[],
	      firstname: '',
	      lastname: '',
	      email: '',
	      password: '',
	      mobileno: '',
	      address: '',
	      gender:'',
	      qualification:'',
	      resume: {name: null},
	      profile: {name: null},
	      selectedFile:'',
	      formErrors: {firstname:'', lastname:'', email: '', password: ''},
	      emailValid: false,
	      passwordValid: false,
	      mobileValid: false,
	      formValid: false,
	      errors: ''
	    },
	    this.baseState = this.state;
  	}

  	handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }
resetForm = () => {
    this.setState(this.baseState)
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
    this.setState({formValid: this.state.emailValid && this.state.passwordValid });
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }
  /*---select box--*/
  handleChange(e){
    this.setState({qualification:e.target.value});
  }
   /* image onchange */
  onChange(e) {
    this.setState({resume:e.target.files[0]})
  }
  /*-------*/
  /* checkbox */
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }
  createCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />
  )
   createCheckboxes = () => (
    items.map(this.createCheckbox)
  )
/*----/----*/
  onSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, mobileno, address, gender, qualification } = this.state;
    var Hobbies='';
    for (const checkbox of this.selectedCheckboxes) {
      Hobbies+= checkbox+',';
    }
    const formData = new FormData();
    formData.append('resume',this.state.resume, this.state.resume.name);
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('mobileno', mobileno);
    formData.append('address', address);
    formData.append('hobbies', Hobbies);
    formData.append('gender', gender);
    formData.append('qualification', qualification);
    axios.post('/api/form/resume', formData )
      .then((result) => {
        if(result.data.data === "The email address you have entered is already registered"){
           this.setState({ errors: result.data.data })
        }
        else{
        	this.resetForm();
           /*this.componentDidMount()*/
        }
    });
  }
  
   	render () {
	   	const { firstname, lastname, email, password, mobileno, address, gender, qualification } = this.state;
	   	if(!this.loggedIn) {
	           return <Redirect to='/login'/>;
	       }
	    return(
	    	<div class="row">
	    		<div class="col-md-3"></div>
	    		<div class="col-md-6">
		      		<form className="demoForm" onSubmit={this.onSubmit}>
			  	        <h2>Sign up</h2>
			  	        <div className="panel panel-default clor">
			  	          <FormErrors formErrors={this.state.formErrors} />
			  	        </div>
			  	        <div className={'form-group ${this.errorClass(this.state.formErrors.firstname)}'} >
			  	          <label htmlFor="firstname">FirstName</label>
			  	          <input type="firstname" required className="form-control" name="firstname"
			  	            placeholder="FirstName"
			  	            value={this.state.firstname}
			  	            onChange={this.handleUserInput}  />
			  	        </div>
			  	         <div className={'form-group ${this.errorClass(this.state.formErrors.lastname)}'} >
			  	          <label htmlFor="lastname">LastName</label>
			  	          <input type="lastname" required className="form-control" name="lastname"
			  	            placeholder="LastName"
			  	            value={this.state.lastname}
			  	            onChange={this.handleUserInput}  />
			  	        </div>
			  	        <div className={'form-group ${this.errorClass(this.state.formErrors.email)}'}>
			  	          <label htmlFor="email">Email address</label>
			  	          <input type="email" required className="form-control" name="email"
			  	            placeholder="Email"
			  	            value={this.state.email}
			  	            onChange={this.handleUserInput}  />
			  	        </div>
			  	        <div className={'form-group ${this.errorClass(this.state.formErrors.password)}'}>
			  	          <label htmlFor="password">Password</label>
			  	          <input type="password" className="form-control" name="password"
			  	            placeholder="Password"
			  	            value={this.state.password}
			  	            onChange={this.handleUserInput}  />
			  	        </div>
			  	        <div className={'form-group ${this.errorClass(this.state.formErrors.mobileno)}'} >
			  	          <label htmlFor="mobileno">Mobile No</label>
			  	          <input type="text" pattern="[7896543210][0-9]{9}" required className="form-control" name="mobileno"
			  	            placeholder="Mobile No"
			  	            value={this.state.mobileno}
			  	            onChange={this.handleUserInput}  />
			  	        </div>
			  	        <div className={'form-group ${this.errorClass(this.state.formErrors.address)}'} >
			  	          <label htmlFor="address">Address </label>
			  	          <textarea required className="form-control" name="address"
			  	            value={this.state.address}
			  	            onChange={this.handleUserInput}  >Address</textarea>
			  	        </div>
			  	        <div className="form-group" >
			  	          	<label htmlFor="resume">Resume </label>
						  	<input className="file-input" type="file" id="resume" name="resume" onChange={this.onChange} />
			  	        </div>
			  	        <div className="form-group" >
			  	          	<label htmlFor="hobbiess">Hobbies </label>
						  	{this.createCheckboxes()}
			  	        </div>
			  	        <div className="form-group" >
			  	          	<label htmlFor="gender">Gender </label>
						  	<input className="file-input" type="radio" id="s1" name="gender" value="male" onChange={this.handleUserInput} /> Male
						  	<input className="file-input" type="radio" id="s2" name="gender" value="female" onChange={this.handleUserInput} /> Female
						  	<input className="file-input" type="radio" id="s3" name="gender" value="other" onChange={this.handleUserInput} /> Other
			  	        </div>
			  	        <div className="form-group" >
			  	          	<label htmlFor="qualification">Qualification </label>
			  	          	<select className="file-input" className="form-control" value={this.state.qualification} onChange={this.handleChange} >
			  	          	  <option value=" " name="qualification"> Select Qualification</option>
							  <option value="BCA" name="qualification">BCA</option>
							  <option value="B.Tech" name="qualification" >B.Tech</option>
							  <option value="M.Tech" name="qualification">M.Tech</option>
							  <option value="MCA" name="qualification">MCA</option>
							</select>
						</div>
			  	        <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Sign up</button>
			            <span class="errors">{this.state.errors}</span>
		  	      	</form>
	      		</div>
	      		<div class="col-md-3"></div>
	    	</div>
	    )   
	}
}
export default Resume;

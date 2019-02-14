import React from 'react';
import {
Route,
NavLink,
HashRouter
} from 'react-router-dom';
import '../App.css';
import logo from '../logo.svg';
import App from '../App';
import Edit from './Edit';
import Create from './Create';
import Show from './Show';
import Register from './Register';
import Login from './Login';
// import { connect } from 'react-redux';
import Logout from './Logout';
import Uploader from './Uploader';
import Resume from './Resume';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.loggedIn = sessionStorage.getItem('user'); 
  }
  render() {
    let userMessage;
    if (!this.loggedIn) {
      userMessage = (
        <ul className="nav navbar-nav">
          <li className="nav-item">
           <NavLink to="/login">Login</NavLink>
          </li>
          <li className="nav-item">
           <NavLink to="/register">Registration</NavLink>
          </li>
          <li className="nav-item">
           <NavLink to="/uploader">Upload</NavLink>
          </li>
        </ul>
      )
    } else {
      userMessage = (
         <ul className="nav navbar-nav">
          <li className="nav-item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/create">Add Book</NavLink>
          </li>
          <li className="nav-item">
           <NavLink to="/resume">Resume</NavLink>
          </li>
          <li className="nav-item">
           <NavLink to="/logout">Logout</NavLink>
          </li>
        </ul> 
      )
    }
    return (
      <HashRouter>
        <div>
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
      <a className="navbar-brand" href="#"><img src={logo} className="App-logo" alt="logo" height="20px"/></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
          { userMessage }
      </div>  
    </nav>
          <div className="content">
            <Route exact path="/" component={App}/>
            <Route path="/create" component={Create} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/uploader" component={Uploader} />
            <Route path="/register" component={Register} />
            <Route path='/edit/:id' component={Edit} />
            <Route path='/show/:id' component={Show} />
            <Route path='/resume' component={Resume} />
          </div>
        </div>
    </HashRouter>
    )
  }
}

export default Navigation;

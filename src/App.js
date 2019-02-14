import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
Redirect,
} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.loggedIn = sessionStorage.getItem('user');
    this.state = {
      books: []
    };
  }

  componentDidMount() {

    axios.get('/api/book')
      .then(res => {
        this.setState({ books: res.data });
      });
  }

  render() {
    if(!this.loggedIn) {
           return <Redirect to='/login'/>;
       }
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              BOOK CATALOG
            </h3>
          </div>
          <div class="panel-body">
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Title</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map(book =>
                  <tr>
                    <td><Link to={`/show/${book._id}`}>{book.isbn}</Link></td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
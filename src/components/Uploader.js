import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Uploader extends React.Component {
  constructor() {
    super();

    this.state ={
      file: {name: null},
      images: []
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
   /* this.getImageData();*/
  }

  

  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    console.log(this.state.file.name)
    formData.append('image',this.state.file, this.state.file.name);
    axios.post('/api/form/upload', formData).then(res =>{
      console.log(res);
    });
   
  }

  render() {
    let images;
    return (
      <section className="section">
        <div className="container  is-fluid">
          <h1 className="title">Photo Gallery</h1>
          <form>
          <div className="file is-info has-name is-fullwidth">
            <label className="file-label">
              <input className="file-input" type="file" id="image" name="image" onChange={this.onChange} />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                  Choose a file…
                </span>
              </span>
              <span className="file-name">
                {this.state.file.name}
              </span>
            </label>
          </div>
          <br/>
          <button className="button is-primary" onClick={this.onFormSubmit} type="submit">Upload</button>
          </form>
        </div>
        <hr/>
        
      </section>
    );
  }
 }

export default Uploader;
import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import FormControl from 'react-bootstrap/FormControl';
import { Redirect } from 'react-router-dom';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class BlogCreate extends Component {
  
  state = {
    pk:'', title: '', body: '' , status, redirect: false, 
  };

  constructor(props) {
    super(props);
    this.handleBlogChange = this.handleBlogChange.bind(this);
  } 

  handleBlogChange(event) {
    let {name: fieldName, value} = event.target;

    this.setState({
      [fieldName]: value
    });
  };

  handleBlogSubmit = event => {
    event.preventDefault();

    axios.post(`http://localhost:8000/api/blog/create/`, 
    {
      title: this.state.title,
      body: this.state.body,
    }
    )
    .then(res => {
      this.setState({ pk:res.data.pk,title: res.data.title, body: res.data.body, status: res.data.status, redirect: true });
    })
  }
  
   render() {
    if (this.state.redirect) {
      return  <Redirect  to={`/blog/${this.state.pk}`}/>
    }
      return (
        <div className="span8">
          <Form className="" onSubmit={this.handleBlogSubmit}>
          <Form.Group className= "span4" controlId="text">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" className="input-block-level"
            type="text" 
            name="title" 
            value={this.state.title} 
            onChange={this.handleBlogChange} 
            placeholder="Title" />
          </Form.Group>
          <Form.Group className= "span4" controlId="textarea">
          <Form.Label>Body</Form.Label>
          <Form.Control as="textarea" rows="3" className="input-block-level"
                           name="body" 
                           value={this.state.body} 
            onChange={this.handleBlogChange} 
                       />
        </Form.Group>
        <Form.Group className= "span4" controlId="submit">
          <Button className="btn btn-medium btn-success" variant="primary" type="submit">
            Submit
          </Button>
          </Form.Group>
      </Form> 
      </div>    
      );
  }

}

export default BlogCreate;
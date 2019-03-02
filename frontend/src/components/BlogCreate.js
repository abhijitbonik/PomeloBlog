import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import IFrame from "./IFrame"

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class BlogCreate extends Component {
  
  state = {
    pk:'', title: '', padid: '', padurl: '', redirect: false, created:false
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

    if(!this.state.created){
          axios.post(`${process.env.REACT_APP_SERVER_API_URL}`+"blog/create/", 
          {
            title: this.state.title,
          }
          )
          .then(res => {
            this.setState({ pk:res.data.blog.pk,title: res.data.blog.title, padid:res.data.ether.etherid, padurl:res.data.url,created:true });
          })
  }
  else{

          axios.put(`${process.env.REACT_APP_SERVER_API_URL}`+"blog/detail/".concat(`${this.state.pk}/`), 
          {
            title: this.state.title,
          }
          )
          .then(res => {
            this.setState({ pk:res.data.pk, title: res.data.title, redirect:true});
          })

    }
  }
  
   render() {
    if (this.state.redirect) {
      return  <Redirect  to={`/blog/${this.state.pk}`}/>
    }
    if(this.state.created){
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
          <IFrame src={`${this.state.padurl}/p/${this.state.padid}`}
          height="600"
          width="1200"
          id="iframe"
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
    else{

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

}

export default BlogCreate;
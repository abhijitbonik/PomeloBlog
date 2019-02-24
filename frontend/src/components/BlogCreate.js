import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import FormControl from 'react-bootstrap/FormControl';
import { Redirect } from 'react-router-dom';
import Iframe from 'react-iframe'

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
          axios.post(`http://10.129.132.103:8000/api/blog/create/`, 
          {
            title: this.state.title,
          }
          )
          .then(res => {
            this.setState({ pk:res.data.blog.pk,title: res.data.blog.title, padid:res.data.ether.etherid, padurl:res.data.url,created:true });
          })
  }
  else{

          axios.post("http://10.129.132.103:8000/api/blog/detail/".concat(`${this.state.pk}/`), 
          {
            title: this.state.title,
          }
          )
          .then(res => {
            this.setState({ pk:res.data.blog.pk, title: res.data.title, redirect:true});
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
          <Iframe url={`${this.state.padurl}/p/${this.state.padid}`}
          width="450px"
          height="450px"
          id="iframe"
          className="myClassname"
          display="initial"
          position="relative"
          allowFullScreen/>
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
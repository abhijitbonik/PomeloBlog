import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import FormControl from 'react-bootstrap/FormControl';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class BlogCreate extends Component {
  
  state = {
    title: '', body: '', status: ''
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
      status: this.state.status
    }
    )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
  
   render() {
      return (
        <Container>
        <Row>
          <Col>
          
          <Form onSubmit={this.handleBlogSubmit}>
          <Form.Group controlId="text">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" 
            type="text" 
            name="title" 
            value={this.state.title} 
            onChange={this.handleBlogChange} 
            placeholder="Title" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Body</Form.Label>
          <Form.Control as="textarea" rows="3" 
                           name="body" 
                           value={this.state.body} 
            onChange={this.handleBlogChange} 
                       />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Status</Form.Label>
    <Form.Control as="select" name="status" 
                           value={this.state.status} 
            onChange={this.handleBlogChange}>
      <option>Draft</option>
      <option>Publish</option>
    </Form.Control>
  </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
      </Form>
          </Col>
        </Row>
      </Container>      
      );
  }

}

export default BlogCreate;
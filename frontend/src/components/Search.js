import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Search extends Component {
	render() {
	  return (
          <div>
		<section id="subintro">
            <div className="jumbotron subhead" id="overview">
            <div className="container">
                <div className="row">
                <div className="span8">
                    <h3><i className="m-icon-big-swapright m-icon-white"></i> Fullwidth</h3>
                    <p>Disputationi comprehensam nam ut eam id accusata explicari minim splendide duo ea dicant.</p>
                </div>
                <div className="span4">
                    <div className="input-append">
                    <Form className="form-search" >
                            <Form.Control type="text" className="input-medium search-query"
                            type="text" 
                            name="search" 
                            placeholder="Search" />
                        <Button className="btn btn-inverse" variant="primary" type="submit">
                        Search
                        </Button>
                    </Form> 
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
  </div>
	  );
	}
  }


  export default Search;
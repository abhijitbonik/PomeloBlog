import React, { Component } from "react";
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import Blogs from "./Blogs";
import BlogCreate from "./BlogCreate";
import BlogView from "./BlogView";

class App extends Component {
	render() {
	  return (
		<BrowserRouter>
		  <div>
			<h1>Simple SPA</h1>
			<ul className="header">
			  <li><NavLink exact to="/">Blogs</NavLink></li>
			  <li><NavLink to="/blogcreate">BlogCreate</NavLink></li>
			  <li><NavLink to="/blogview">BlogView</NavLink></li>
			</ul>
			<div className="content">
			  <Route exact path="/" component={Blogs}/>
			  <Route path="/blogcreate" component={BlogCreate}/>
			  <Route path="/blogview" component={BlogView}/>
			</div>
		  </div>
		</BrowserRouter>
	  );
	}
  }
  
 
export default App;

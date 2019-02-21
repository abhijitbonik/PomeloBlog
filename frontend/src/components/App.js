import React, { Component } from "react";
import {
  Route,
  NavLink,
	BrowserRouter,
	Switch
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

				<li><NavLink exact to="/">BlogCreate</NavLink></li>
			  <li><NavLink  to="/blog">Blogs</NavLink></li>
			  
			</ul>
			<div className="content">
			  
			<Route exact path="/" component={BlogCreate}/>
				<Switch>
        <Route exact path="/blog" component={Blogs}/>
        <Route name="blogview" path='/blog/:id' component={BlogView}/>
      </Switch>
			</div>
		  </div>
		</BrowserRouter>
	  );
	}
  }
  
 
export default App;

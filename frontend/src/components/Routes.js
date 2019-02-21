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
import Menu from "./Menu"
import Search from "./Search"
class Routes extends Component {
	render() {
	  return (
		<BrowserRouter>
		<div>
			<Menu/>
			<Search/>
			<section id="maincontent">
				<div className="container">
					<div className="row">
				<Route exact path="/" component={Blogs}/>
				<Switch>
				<Route name="blogcreate" path="/blog/create" component={BlogCreate}/>
        <Route name="blogview" path='/blog/:id' component={BlogView}/>
      </Switch>
				</div>
				</div>
			</section>
			</div>
		</BrowserRouter>
	  );
	}
  }
  
 
export default Routes;
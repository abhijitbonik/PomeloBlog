import React, { Component } from "react";
import {
  Link
} from "react-router-dom";

class Menu extends Component {
	render() {
	  return (
		<header>
        <div className="navbar navbar-fixed-top">
            <div className="navbar-inner">
                <div className="container">
                <Link className="brand logo" to="/">
						        <img src="assets/img/logo.png" alt="" />
                        </Link>
                    <div>
                        <nav>
                        <ul className="nav topnav">

                            <li className="dropdown success">
                                    <Link to="/">
                                    <i className="icon-home icon-white"></i>Blogs</Link>
                                        <ul className="dropdown-menu">
                                          <li><Link to="/blog/create">Create Blog</Link></li>
                                        </ul>
                                    </li>

                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        </header>
	  );
	}
  }


  export default Menu;
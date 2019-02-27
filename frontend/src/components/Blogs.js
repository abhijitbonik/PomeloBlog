import React, { Component } from "react";
import { Link } from 'react-router-dom';
import moment from 'moment';

class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/blog/")
      .then(res =>{
        localStorage.setItem('result', res)
        return res.json()
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  sub(string){
    if(string){
      return string.substring(0,150);
    }
    return string
  }

  humanize(time) {
    return moment().format(time)
  }

    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <div className="span8">
          {items.map(item => (
              <article key={item.pk} className="blog-post">
                <div className="tooltip-demo headline">
                  <h4><Link to={`/blog/${item.pk}`}>{item.title}</Link></h4>
                  <span className="comment"><a href="#" rel="tooltip" data-placement="top" title="3 Comments">3 comments</a></span>
                </div>
                <div className="row">
                  <div className="span3">
                    <a href="#"><img src={`${item.image}`} alt="" /></a>
                  </div>
                  <div className="span6">
                    <ul className="post-meta">
                      <li className="first"><i className="icon-user"></i> <span><a href="#">{item.created_by}</a></span></li>
                      <li><i className="icon-list-alt"></i> <span><a href="#">{item.status}</a></span></li>
                      <li className="last"><i className="icon-tags"></i> <span><a href="#">Blog</a>, <a href="#">Web page</a>, <a href="#">Clean</a></span></li>
                      <li className="last"><i className="icon-tags"></i> <span><a href="#">{this.humanize(item.created_at)}</a></span></li>
                    </ul>
                    <div className="clearfix"></div>
                    <p>
                      {this.sub(item.body)}...
                    </p>
                  <Link className="btn btn btn-success" to={`/blog/${item.pk}`}>Read more</Link>
                  </div>
                </div>
              </article>
              ))}
          </div>
        );
      }
    }
  }


export default Blogs;
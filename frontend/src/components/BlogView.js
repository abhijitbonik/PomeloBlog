import React, { Component } from "react";

class BlogView extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: []
    };
  }

  componentDidMount() {
    fetch("http://10.129.132.103:8000/api/blog/detail/".concat(`${this.props.match.params.id}/`))
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            item: result
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
  render() {
    const { error, isLoaded, item } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="span8">
              <article className="blog-post">
                <div className="tooltip-demo headline">
                  <h4>{item.title}</h4>
                  <span className="comment"><a href="#" data-rel="tooltip" data-placement="top" title="4 Comments">4 comments</a></span>
                </div>
                <div className="clearfix"></div>
                <img src="assets/img/dummies/blog1.jpg" alt="" />
                <ul className="post-meta">
                  <li className="first"><i className="icon-user"></i> <span><a href="#">{item.created_by}</a></span></li>
                  <li><i className="icon-list-alt"></i> <span><a href="#">{item.status}</a></span></li>
                  <li className="last"><i className="icon-tags"></i> <span><a href="#">{item.created_at}</a>, <a href="#">Blog</a>, <a href="#">Web page</a>, <a href="#">Clean</a></span></li>
                </ul>
                <div className="clearfix"></div>
                <p>
                {item.body}
                </p>
                <blockquote>
                  <p>
                    Eos simul tritani gubergren et, te vel ullum commodo docendi, ne sea regione laoreet iracundia. His menandri quaestio ea. Ea congue volutpat has, cu vim delenit offendit ullamcorper. Ius at agam malorum suscipiantur, sit aliquid percipitur ei.
                  </p>
                </blockquote>

              </article>
        </div>
      );
    }
  }
}

 
export default BlogView;



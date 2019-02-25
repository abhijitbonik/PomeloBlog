import React, { Component } from "react";

class IFrame extends Component {
      
    render(){
      return(         
        <div>          
          <iframe src={this.props.src} height={this.props.height} width={this.props.width}/>         
        </div>
      )
    }
  }

export default IFrame;
import React, { Component } from "react";


export default class Comment extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>{this.props.time}</div>
        <div>{this.props.message}</div>
      </div>
    );
  }
}


import React, { Component } from "react";
import './comment.css';
import './moment.css';
import App from '../App';

export default class Comment extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className= { this.props.data.type === App.COMMENT ? 'comment' : 'moment'}>
        <div>{this.props.data.time}</div>
        <div>{this.props.data.message}</div>
      </div>
    );
  }
}


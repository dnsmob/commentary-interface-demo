import React, { Component } from "react";
import './comment.css';
import App from '../App';

export default class Comment extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { type, time, message } = this.props.data;
    
    return (
      <div className= { type === App.COMMENT ? 'comment' : 'moment'}>
        <div>{time}</div>
        <div className="message"><span>{message}</span></div>
      </div>
    );
  }
}


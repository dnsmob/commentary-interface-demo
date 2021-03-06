import React, { Component } from "react";
import './moment.css';

export default class Moment extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { time, message } = this.props.data;

    return (
      <div onClick={() => this.props.clickCallback(time)}>
        {time} - {message}
      </div>
    );
  }
}


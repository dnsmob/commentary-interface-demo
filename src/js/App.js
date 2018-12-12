import React, { Component } from "react";
import ReactDOM from "react-dom";
import Comment from './components/comments/Comment'


export default class App extends Component {

  constructor() {
    super();

    this.state = {
      comments: [],
      moments: []
    }

    this._loadComments();
    this._loadMoments();
  }

  _loadComments() {
    fetch('http://localhost:3000/comments')
      .then(response => response.json())
      .then(json => {
        let array = this._mixIntoComments(json).sort((a, b) => (a.time - b.time));
        this.setState({ comments: array });
      })
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error
        }));
  }

  _loadMoments() {
    fetch('http://localhost:3000/moments')
      .then(response => response.json())
      .then(json => {
        this.setState({ comments: this._mixIntoComments(json) })
        this.setState({ moments: json });
      })
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error
        }));
  }

  _mixIntoComments(array) {
    return this.state.comments.concat(array);
  }

  _handleResponse(json) {
    this.setState({ comments: json });
  }

  render() {
    return (
      <div style={styles}>
        <div>
          {this.state.comments.map((item, count) => <Comment key={count} message={item.body} time={item.time} />)}
        </div>
        <div>
          {this.state.moments.map((item, count) => <Comment key={count} message={item.body} time={item.time} />)}
        </div>
      </div>
    );
  }
}

const styles = {
  display: 'flex',
  flex: 1,
  maxWidth: '600px',
  margin: '0 auto'
}


const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;

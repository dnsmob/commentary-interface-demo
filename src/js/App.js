import React, { Component } from "react";
import ReactDOM from "react-dom";
import Comment from './components/Comment'
import Moment from './components/Moment'


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
        this.setState({ comments: this._mixIntoComments(json) });
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
    // moments get injected into comments and sort by time
    return this.state.comments.concat(array).sort((a, b) => (a.time - b.time));
  }

  _handleResponse(json) {
    this.setState({ comments: json });
  }

  render() {
    return (
      <div style={styles}>
        <div>
          Live commentary
          {this.state.comments.map(
            (item, count) => <Comment key={count} data={item} />
          )}
        </div>
        <div>
          Key moments
          {this.state.moments.map(
            (item, count) => <Moment key={count} data={item} />
          )}
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

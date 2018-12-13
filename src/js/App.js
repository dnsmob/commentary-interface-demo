import React, { Component } from "react";
import ReactDOM from "react-dom";
import Comment from './components/Comment';
import Moment from './components/Moment';
import './app.css';


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

  highlightNode(event){
    // let this.state.comments
    console.log('event', this.commentMap);
    
  }

  render() {
    return (
      <div className="holder">
        <div className="commentaries">
          <h2>Live commentary</h2>
          {this.state.comments.map((item, count) =>
            <Comment
              key={count}
              data={item}
            />
          )}
        </div>
        <div className="moments">
          <h2>Key moments</h2>
          {this.state.moments.map((item, count) =>
            <Moment
              key={count}
              data={item}
              clickCallback={this.highlightNode.bind(this)}
            />
          )}
        </div>
      </div>
    );
  }
}
App.COMMENT = 'comment';
App.MOMENT = 'moment';


const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;

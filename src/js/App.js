import React, { Component } from "react";
import ReactDOM from "react-dom";
import Comment from './components/Comment';
import Moment from './components/Moment';
import './app.css';

const server = 'http://localhost:3004';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      comments: [],
      moments: []
    }
  }

  componentDidMount() {
    this._loadComments();
    this._loadMoments();
  }

  _loadComments() {
    fetch(`${server}/comments`)
      .then(response => response.json())
      .then(json => {
        this.setState({ comments: this._mixIntoComments(json) });
      })
      .catch(error => console.log('Something bad happened ' + error));
  }

  _loadMoments() {
    fetch(`${server}/moments`)
      .then(response => response.json())
      .then(json => {
        this.setState({ comments: this._mixIntoComments(json) })
        this.setState({ moments: json });
      })
      .catch(error => console.log('Something bad happened ' + error));
  }

  _mixIntoComments(array) {
    // moments get injected into comments and sort by time
    return this.state.comments.concat(array).sort((a, b) => {
      // sort on times
      if (a.time > b.time) return 1;
      if (a.time < b.time) return -1;

      // sort on moments
      if (a.type > b.type) return -1;
      if (a.type < b.type) return 1;
    });
  }

  _handleResponse(json) {
    this.setState({ comments: json });
  }

  highlightNode(time) {
    // cleaning up via css/dom manipulation as it might be more performant than changing states
    document.querySelectorAll('.highlighted').forEach(item => item.classList.remove('highlighted'));

    const entry = this.mappedComments.filter(node => node.props.data.type === App.COMMENT && node.props.data.time === time)[0];
    const node = ReactDOM.findDOMNode(entry.ref.current);
    node.classList.add('highlighted');
  }

  render() {
    this.mappedComments = this.state.comments.map((item, count) =>
      <Comment
        key={count}
        data={item}
        ref={React.createRef()}
      />
    )

    return (
      <div className="holder">
        <div className="commentaries">
          <h2>Live commentary</h2>
          {this.mappedComments}
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

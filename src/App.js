/* global chrome */

import React, { Component } from 'react';
import './App.css';
// import readerApp, { stopReading } from './utils';

let t;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: `This extension is designed to help you read faster than you ever knew you could.\nJust paste your text here, or select text on a webpage and see how fast you can read!`,
      currentParagraph: 1,
      totalParagraphs: 0,
      speed: 135,
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.readParagraph = this.readParagraph.bind(this);
    this.readCurrentParagraph = this.readCurrentParagraph.bind(this);
    this.begin = this.begin.bind(this);
    this.rewind = this.rewind.bind(this);
    this.ff = this.ff.bind(this);
    this.end = this.end.bind(this);
    this.pause = this.pause.bind(this);
    this.stopReading = this.stopReading.bind(this);
  }

  componentDidMount() {
    const textField = document.getElementById('text-input');
    textField.innerHTML = this.state.text;

    this.setState({ totalParagraphs: this.state.text.split('\n').length });
    // chrome.tabs.executeScript(
    //   {
    //     code: 'window.getSelection().toString();',
    //   },
    //   function(selection) {
    //     console.log(selection);
    //     if (selection[0]) {
    //       this.setState((this.state.text = selection[0]));
    //       textField.innerHTML = this.state.text;
    //     }
    //   }
    // );
  }

  handleTextChange(event) {
    event.preventDefault();

    this.setState({
      text: event.target.value,
      totalParagraphs: event.target.value.split('\n').length,
      currentParagraph: 1,
    });
  }

  handleSpeedChange(event) {
    event.preventDefault();
    this.setState({ speed: event.target.value });
  }

  begin() {
    this.setState({ currentParagraph: 1 });
  }

  rewind() {
    this.setState({ currentParagraph: this.state.currentParagraph - 1 });
  }

  ff() {
    this.setState({ currentParagraph: this.state.currentParagraph + 1 });
  }

  end() {
    this.setState({ currentParagraph: this.state.text.split('\n').length });
  }

  readParagraph(string, speed) {
    let wordArray = string.split(' ');
    wordArray.push('&nbsp;');
    let mainDiv = document.getElementById('read-view');
    let k = 1;

    for (let i = 0; i < wordArray.length; i++) {
      t = setTimeout(() => {
        mainDiv.innerHTML = `${wordArray[i]}`;
      }, k * speed);
      k++;
    }
  }

  readCurrentParagraph() {
    const currentSpeed = this.state.speed;
    this.readParagraph(
      this.state.text.split('\n')[this.state.currentParagraph - 1],
      currentSpeed
    );
    if (this.state.currentParagraph < this.state.totalParagraphs) {
      this.setState({ currentParagraph: this.state.currentParagraph + 1 });
    } else {
      this.setState({ currentParagraph: 1 });
    }
  }

  stopReading() {
    clearTimeout(t);
    alert(`This doesn't work yet`);
  }

  pause() {
    alert('Reading Paused: Click OK to Resume');
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <div>
            <img alt="" width="100px;" src="/icon_128.png" />
          </div>
        </div>

        <h3>Highlight text you want to SpeedRead</h3>

        <div id="read-view">&nbsp;</div>

        <textarea
          onChange={this.handleTextChange}
          id="text-input"
          name="text"
          rows="14"
          cols="10"
          wrap="soft"
          value={this.state.text}
        />

        <div className="counter">
          <div>Paragraph:&nbsp;(&nbsp;</div>
          <div id="currentParagraph">{this.state.currentParagraph}</div>
          <div>&nbsp;/&nbsp;</div>
          <div id="totalNumberOfParagraphs">{this.state.totalParagraphs}</div>
          <div>&nbsp;)</div>
        </div>

        <div className="controls">
          <img
            alt=""
            onClick={this.begin}
            className="icon scrub"
            id="begin"
            src="/images/begin.png"
          />
          <img
            alt=""
            onClick={this.rewind}
            className="icon scrub"
            id="rewind"
            src="/images/rewind.png"
          />
          <img
            alt=""
            onClick={this.readCurrentParagraph}
            className="icon scrub"
            id="play"
            src="/images/play.png"
          />
          <img
            alt=""
            onClick={this.pause}
            className="icon scrub"
            id="pause"
            src="/images/pause.png"
          />
          <img
            alt=""
            onClick={this.stopReading}
            className="icon scrub"
            id="stop"
            src="/images/stop.png"
          />
          <img
            alt=""
            onClick={this.ff}
            className="icon scrub"
            id="ff"
            src="/images/ff.png"
          />
          <img
            alt=""
            onClick={this.end}
            className="icon scrub"
            id="end"
            src="/images/end.png"
          />
        </div>

        <table align="center">
          <tr>
            <td>Speed (ms):</td>
            <td />
          </tr>
          <tr>
            <td>
              <input
                onChange={this.handleSpeedChange}
                id="text-speed"
                type="number"
                value={this.state.speed}
              />
            </td>
            <td>
              <button onClick={this.readCurrentParagraph} id="textareaButton">
                Read Text
              </button>
            </td>
          </tr>
        </table>
        <p>
          &copy; Pillbox Media, Inc.{' '}
          <a
            href="https://www.github.com/pillboxmediainc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-github" />
          </a>
        </p>
        <div id="footer">
          <a
            href="/info.html"
            onclick="window.open('/info.html','name','width=600,height=400')"
          >
            <img alt="" className="icon info" src="/images/info.png" />
          </a>
        </div>
      </div>
    );
  }
}

export default App;

import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
var data = require("../../data/data.json");

class VideoPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      playlist: data.playlist
    };
  }
  render() {
    let thisPlaylist = this.state.playlist;
    console.log(thisPlaylist);
    return (
      <ul>
        {thisPlaylist.map((video, index) => {
          return <li key={index}>{video.content_url}</li>;
        })}
      </ul>
    );
  }
}

ReactDOM.render(<VideoPlaylist />, document.getElementById("root"));

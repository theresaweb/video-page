import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
var data = require("../../data/data.json");
class Video extends React.Component {
  render() {
    return (
      <div>
        <video controls src={this.props.playlist[0].content_url} />
        <footer>{this.props.playlist[0].title}</footer>
      </div>
    );
  }
}
class VideoPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      playlist: data.playlist,
      contentUrl: ""
    };
  }
  render() {
    let thisPlaylist = this.state.playlist.slice();
    return (
      <div>
        <Video playlist={this.state.playlist} />
        <div className="videoCarousel">
          {thisPlaylist.map((video, index) => {
            return (
              <img
                className="videoThumb"
                key={index}
                src={video.image_url}
                alt={video.title}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<VideoPlaylist />, document.getElementById("root"));

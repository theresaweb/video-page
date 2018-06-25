import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
var data = require("../../data/data.json");
class Video extends React.Component {
  render() {
    var thisVideoIndex = this.props.videoIndex;
    return (
      <div>
        <video controls src={this.props.playlist[thisVideoIndex].content_url} />
        <footer>{this.props.playlist[thisVideoIndex].title}</footer>
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
      videoIndex: 0
    };
  }
  handleThumbClick(index) {
    this.setState({
      videoIndex: index
    });
  }
  render() {
    let thisPlaylist = this.state.playlist.slice();
    return (
      <div>
        <Video
          playlist={this.state.playlist}
          videoIndex={this.state.videoIndex}
        />
        <div className="videoCarousel">
          {thisPlaylist.map((video, index) => {
            var imgUrl = video.image_url + "?width=XXX";
            return (
              <figure className="videoThumb">
                <img
                  key={index}
                  src={imgUrl}
                  alt={video.title}
                  onClick={() => this.handleThumbClick(index)}
                />
                <figcaption>{video.title}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<VideoPlaylist />, document.getElementById("root"));

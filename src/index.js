import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
var data = require("../../data/data.json");
class Video extends React.Component {
  render() {
    var thisVideoIndex = this.props.videoIndex;
    return (
      <div>
        <video
          id="activeVideo"
          controls
          src={this.props.playlist[thisVideoIndex].content_url}
          onEnded={() => {
            this.props.videoEnded();
          }}
        />
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
      videoIndex: 0,
      activeIndex: 0,
      videoCount: Object.keys(data.playlist).length
    };
  }
  handleThumbClick(index) {
    this.setState({
      videoIndex: index,
      activeIndex: index
    });
  }
  handleVideoEnd() {
    var nextIndex = this.state.videoIndex + 1;
    if (nextIndex < this.state.videoCount) {
      this.setState({
        videoIndex: nextIndex,
        activeIndex: nextIndex
      });
      let vid = document.getElementById("activeVideo");
      vid.onloadedmetadata = function() {
        vid.play();
      };
    } else {
      this.setState({
        videoIndex: 0,
        activeIndex: 0
      });
      let vid = document.getElementById("activeVideo");
      vid.onloadedmetadata = function() {
        vid.play();
      };
    }
  }
  render() {
    let thisPlaylist = this.state.playlist.slice();
    return (
      <div>
        <Video
          playlist={this.state.playlist}
          videoIndex={this.state.videoIndex}
          videoEnded={this.handleVideoEnd.bind(this)}
        />
        <div className="videoCarousel">
          {thisPlaylist.map((video, index) => {
            var imgUrl = video.image_url + "?width=XXX";
            const activeThumb =
              this.state.activeIndex === index ? "activeThumb" : null;
            const classes = `${activeThumb} videoThumb`;
            return (
              <figure className={classes} key={index}>
                <img
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

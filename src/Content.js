import React, { Component } from 'react';
import YoutubePlayer from 'react-youtube-player';
import './Content.css';


class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoID: "",
      playerStyle: {
        display: "",
      },
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.videoID === nextProps.videoID) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div className="Content-layout">
        <div className ="Content-player" style={this.props.playerStyle}>
          <YoutubePlayer
            videoId={this.props.videoID}
            playbackState='playing'
            configuration={
                {
                    showinfo: 0,
                    controls: 1,
                    origin: 'http://localhost:3000',
                }
            }
          />
        </div>
      </div>
    )
  }
}

export default Content;
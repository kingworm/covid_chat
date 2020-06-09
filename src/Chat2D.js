import React, { Component } from 'react';
import './Chat2D.css';


class Chat2D extends Component {

  render() {
    const chatList = this.props.chatList;
    const popups = chatList.map(
      (chat, i) => (
        <div className="Chat2D-popup" key = {i} style={chat.popupStyle}>{chat.writer} : {chat.chatValue}</div>
      )
    );
    return (
      <div>
        {popups}
        <div className="Chat2D-layout">
          <div className="Chat2D-title">2D채팅방</div>
        </div>
      </div>
    )
  }
}

export default Chat2D;
import React, { Component } from 'react';
import './ChatThread.css';

class ChatThread extends Component {
  render() {
    const chatList = this.props.chatList;
    const chatTopic = (this.props.chatTopic ? 
                      <div className="ChatThread-topic">{this.props.chatTopic.writer} : {this.props.chatTopic.chatValue}</div> :
                      <div></div>);
    const chatHistory = chatList.map(
      (chat, i) => (
        <div key = {i} className="ChatThread-single" >[{chat.time}] {chat.writer} : {chat.chatValue}</div>
      )
    );
    return (
      <div className="ChatThread-layout">
        <div className="ChatThread-title">쓰레드 채팅방</div>
        {chatTopic}
        <div className="ChatThread-container">
          <div className="ChatThread-chatList">
            {chatHistory}
          </div>
          <div style={{ float:"left", clear:"both"}}
               ref={(el) => { this.props.scrollToBottom("t", el);}}>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatThread;
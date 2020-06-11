import React, { Component } from 'react';
import './ChatThread.css';

class ChatThread extends Component {
  render() {
    const chatList = this.props.chatList;
    const chatTopic = (this.props.chatTopic ? 
                      <div className="ChatThread-topic">
                          <span className="Chat1D-single-writer">{this.props.chatTopic.writer}</span>
                          <span className="Chat1D-single-time">{this.props.chatTopic.time}</span>
                          <div className="Chat1D-single-chatValue">{this.props.chatTopic.chatValue}</div>
                      </div> :
                      <div></div>);
    const chatHistory = chatList.map(
      (chat, i) => (
        <div key = {i} className="ChatThread-single" >
          <span className="Chat1D-single-writer">{chat.writer}</span>
          <span className="Chat1D-single-time">{chat.time}</span>
          <div className="Chat1D-single-chatValue">{chat.chatValue}</div>
        </div>
      )
    );
    return (
      <div className="ChatThread-layout">
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
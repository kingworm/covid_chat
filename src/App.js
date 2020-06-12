import React, { Component } from "react";
import "./App.css";
import Chat1D from "./Chat1D";
import Chat2D from "./Chat2D";
import Blackboard from "./Blackboard";
import ChatThread from "./ChatThread";
import Content from "./Content";
import Clock from "./Clock";

class App extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      username: "guest",
      chatValue: "",
      chatThreadValue: "",
      chatThreadIndex: null,
      chatThreadList: [],
      chat2DList: this.props.chatReducer.chat2DList || [],
      chat1DList: this.props.chatReducer.chat1DList || [],
      remove: 0,
      scrollIndex: "o",
      isBreakTime: false,
      users: [],
      commandValue: "",
      videoID: "hF_lIqruUeQ",
      playerStyle: { display: "block" },
      classTitle: "1학년 1반",
      isPlayerRendered: false
    };
  }

  handleReadData(readData) {
    if (readData === "break") {
      window.alert("쉬는시간입니다");
      this.setState({
        classTitle: "쉬는 쉬간"
      });
    } else if (readData === "!break") {
      window.alert("수업시간입니다");
      this.setState({
        classTitle: "수학"
      });
    } else if (readData.substring(0, 4) === "http") {
      var videoID = readData.match(
        /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
      );
      if (videoID != null) {
        const playerStyle = {
          display: "block"
        };
        this.setState({
          videoID: videoID[1],
          playerStyle: playerStyle
        });
        window.alert("URL이 업데이트 되었습니다");
      } else {
        window.alert("유효하지 않은 URL입니다.");
      }
    } else if (readData === "refresh") {
      this.setState({
        chatValue: "",
        chatThreadValue: "",
        chatThreadIndex: null,
        chatThreadList: [],
        chat2DList: [],
        chat1DList: [],
        remove: 0,
        scrollIndex: "o",
        isBreakTime: false,
        commandValue: "",
        videoID: "",
        playerStyle: { display: "none" }
      });
    }
  }

  chat1DdoChange(e) {
    const newValue = e.target.value;
    this.setState({ chatValue: newValue });
  }

  chat1DdoSubmit(e) {
    const chat2DList = this.props.chatReducer.chat2DList;
    const chatValue = this.state.chatValue;
    if (chatValue.startsWith("!")) {
      /* Chat1D로 가야함 */
      // const chat1DList = this.props.chatReducer.chat1DList;
      const today = new Date();
      var sec = today.getSeconds();
      var min = today.getMinutes();
      var hr = today.getHours();
      if (sec < 10) {
        sec = "0" + sec;
      }
      if (min < 10) {
        min = "0" + min;
      }
      if (hr < 10) {
        hr = "0" + hr;
      }
      const time = today.getHours() + ":" + min + ":" + sec;
      const newItem = {
        time: time,
        writer: this.state.username,
        chatValue: chatValue.slice(1, chatValue.length),
        chatThreadList: []
      };
      console.log("send chat !!");
      this.props.sendChat({
        chat: newItem,
        username: this.state.username
      });
      this.setState({
        chat1DList: this.props.chatReducer.chat1DList
      });
      this.setState({
        scrollIndex: "o"
      });
    } else {
      if (chatValue) {
        const popupX = 69 + Math.random() * (31 - 15);
        const popupY = 11 + Math.random() * 48;
        const popupStyle = {
          left: popupX + "vw",
          top: popupY + "vh",
          width: 40 + chatValue.length * 15 + "px"
        };
        const newItem = {
          popupStyle: popupStyle,
          writer: "나",
          chatValue: chatValue
        };
        if (!chat2DList) {
          const newList = [newItem];
          this.setState({
            chat2DList: newList
          });
        } else {
          this.setState({
            chat2DList: chat2DList.concat(newItem)
          });
        }
        setTimeout(() => {
          this.setState(prevState => ({
            remove: prevState.remove + 1
          }));
        }, 4000);
      }
      this.setState({
        scrollIndex: "0"
      });
    }
    this.setState({
      chatValue: ""
    });
    e.preventDefault();
  }

  chatThreadHandleClick(flag, i) {
    if (flag === "o") {
      /* Click event from chat1D */
      // 1. Update thread information in state
      const chat = this.state.chat1DList[i];
      const chatThreadList = chat.chatThreadList;
      this.setState({
        chatThreadIndex: i,
        chatThreadList: chatThreadList,
        scrollIndex: "t"
      });
    }
  }

  chatThreadDoChange(e) {
    const newValue = e.target.value;
    this.setState({ chatThreadValue: newValue });
  }
  chatThreadDoSubmit(e) {
    const chatThreadIndex = this.state.chatThreadIndex;
    const chatThreadValue = this.state.chatThreadValue;
    if (chatThreadIndex !== null && chatThreadValue) {
      const chatThreadList = this.state.chatThreadList;
      var newChat1DList = this.state.chat1DList.slice();
      // 1. Get current time
      const today = new Date();
      var sec = today.getSeconds();
      var min = today.getMinutes();
      var hr = today.getHours();
      if (sec < 10) {
        sec = "0" + sec;
      }
      if (min < 10) {
        min = "0" + min;
      }
      if (hr < 10) {
        hr = "0" + hr;
      }
      const time = today.getHours() + ":" + min + ":" + sec;
      // 2. Make new item for thread chat list
      const newThreadChat = {
        time: time,
        writer: "나",
        chatValue: chatThreadValue
      };
      if (chatThreadList) {
        // thread chat list is not empty
        newChat1DList[chatThreadIndex].chatThreadList = newChat1DList[
          chatThreadIndex
        ].chatThreadList.concat(newThreadChat);
        this.setState({
          chat1DList: newChat1DList,
          chatThreadList: chatThreadList.concat(newThreadChat),
          chatThreadValue: ""
        });
      } else {
        newChat1DList[chatThreadIndex].chatThreadList = [newThreadChat];
        this.setState({
          chat1DList: newChat1DList,
          chatThreadList: [newThreadChat],
          chatThreadValue: ""
        });
      }
    }
    this.setState({
      chatThreadValue: "",
      scrollIndex: "t"
    });
    e.preventDefault();
  }

  componentDidMount() {
    // this.props.enterChatroom();
  }

  componentDidUpdate() {
    const remove = this.state.remove;
    if (remove !== 0) {
      this.setState(
        {
          remove: remove - 1
        },
        () => {
          this.props.pop2DChat();
        }
      );
    }
  }

  scrollToBottom(flag, someRef) {
    if (someRef) {
      if (this.state.scrollIndex === flag) {
        someRef.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  commandDoChange(e) {
    const newValue = e.target.value;
    this.setState({ commandValue: newValue });
  }

  commandDoSubmit(e) {
    this.handleReadData(this.state.commandValue);
    this.setState({
      commandValue: ""
    });
    e.preventDefault();
  }

  render() {
    const chat1DdoSubmit = e => this.chat1DdoSubmit(e);
    const chat1DdoChange = e => this.chat1DdoChange(e);
    const chatThreadDoSubmit = e => this.chatThreadDoSubmit(e);
    const chatThreadDoChange = e => this.chatThreadDoChange(e);
    const commandDoChange = e => this.commandDoChange(e);
    const commandDoSubmit = e => this.commandDoSubmit(e);

    const content_div = this.state.isPlayerRendered ? (
      <Content
        videoID={this.state.videoID}
        playerStyle={this.state.playerStyle}
      />
    ) : (
      <Content
        videoID={this.state.videoID}
        playerStyle={this.state.playerStyle}
      />
    );
    if (this.state.isPlayerRendered === false) {
      this.setState({
        isPlayerRendered: true
      });
    }
    return (
      <div className="App">
        <span className="App-clock">
          <Clock />
        </span>
        <span className="App-classTitle">{this.state.classTitle}</span>
        <span className="App-Command">
          <form onSubmit={commandDoSubmit}>
            <input
              type="text"
              className="AppCommandInput"
              value={this.state.commandValue}
              onChange={commandDoChange}
              placeholder="명령을 입력해주세요"
            />
          </form>
        </span>
        <div className="App-Blackboard">
          <Blackboard notice={this.props.chatReducer.notice} />
        </div>
        <div className="App-content">{content_div}</div>
        <div className="App-ChatThread">
          <ChatThread
            chatList={this.state.chatThreadList}
            chatTopic={
              this.props.chatReducer.chat1DList[this.state.chatThreadIndex]
            }
            scrollToBottom={(flag, ref) => this.scrollToBottom(flag, ref)}
          />
        </div>
        <div className="App-Chat2D">
          <Chat2D chatList={this.props.chatReducer.chat2DList} />
        </div>
        <div className="App-Chat1D">
          <Chat1D
            chatList={this.props.chatReducer.chat1DList}
            chatThreadHandleClick={(flag, i) =>
              this.chatThreadHandleClick(flag, i)
            }
            scrollToBottom={(flag, ref) => this.scrollToBottom(flag, ref)}
          />
        </div>
        <div className="App-ChatInput">
          <form onSubmit={chat1DdoSubmit}>
            <input
              type="text"
              className="chatInput"
              value={this.state.chatValue}
              onChange={chat1DdoChange}
              placeholder="채팅을 입력해주세요"
            />
          </form>
        </div>
        <div className="App-ChatThreadInput">
          <form onSubmit={chatThreadDoSubmit}>
            <input
              type="text"
              className="chatThreadInput"
              value={this.state.chatThreadValue}
              onChange={chatThreadDoChange}
              placeholder="채팅을 입력해주세요"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default App;

// import React from "react";
// import { HashRouter as Router, Route } from "react-router-dom";

// import { Home } from "./components/Home";
// import { Chat } from "./components/chat/Chat";

// function App({
//   chatReducer,
//   mySocketId,
//   enterChatroom,
//   leaveChatroom,
//   sendChat,
//   clearChat
// }) {
//   console.log("src/App.js ", chatReducer);
//   return (
//     <Router>
//       <Route path="/" exact component={Home}></Route>
//       <Route
//         path="/chat/:id"
//         render={props => (
//           <Chat
//             chatReducer={chatReducer}
//             mySocketId={mySocketId}
//             leaveChatroom={leaveChatroom}
//             enterChatroom={enterChatroom}
//             sendChat={sendChat}
//             clearChat={clearChat}
//           />
//         )}
//       />
//     </Router>
//   );
// }

// export default App;

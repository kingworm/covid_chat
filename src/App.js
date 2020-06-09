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
    super(props);
    console.log(props);
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
      users: []
    };
  }

  handleKeyPress = e => {
    if (e.charCode === "b") {
      this.setState({
        isBreakTime: !this.state.isBreakTime
      });
      if (this.state.isBreakTime) {
        window.alert("쉬는 시간이에요!");
      } else {
        window.alert("수업 시간입니다.");
      }
    }
  };

  chat1DdoChange(e) {
    const newValue = e.target.value;
    this.setState({ chatValue: newValue });
  }

  chat1DdoSubmit(e) {
    // const chat2DList = this.props.chatReducer.chat2DList;
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
      this.props.sendChat({
        chat: newItem,
        username: this.state.username
      });
      // if (chat1DList.empty) {
      //   this.setState({
      //     chat1DList: [newItem]
      //   });
      // } else {
      //   this.setState({
      //     chat1DList: chat1DList.concat(newItem)
      //   });
      // }
      this.setState({
        chat1DList: this.props.chatReducer.chat1DList
      });
      this.setState({
        scrollIndex: "o"
      });
    } else {
      if (chatValue) {
        const popupX = 69 + Math.random() * (31 - 15);
        const popupY = 2 + Math.random() * 58;
        const popupStyle = {
          zIndex: "1",
          position: "absolute",
          left: popupX + "vw",
          top: popupY + "vh",
          border: "1px solid",
          width: 40 + chatValue.length * 15 + "px",
          maxWidth: "15vw",
          text_align: "center",
          verticalAlign: "middle",
          background: "white"
        };
        const newItem = {
          popupStyle: popupStyle,
          writer: this.state.username,
          chatValue: chatValue
        };
        this.props.send2DChat({ chat: newItem, username: this.state.username });
        // if (!chat2DList) {
        //   const newList = [newItem];
        //   this.setState({
        //     chat2DList: newList
        //   });
        // } else {
        //   this.setState({
        //     chat2DList: chat2DList.concat(newItem)
        //   });
        // }
        this.setState({
          chat2DList: this.props.chatReducer.chat2DList
        });
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
    // fetch("/users")
    //   .then(res => res.json())
    //   .then(users => this.setState({ users }));
    // this.socket = socketIOClient("http://localhost:3002");
    // this.socket.on("my socket id", data => {
    //   console.log(data);
    //   this.setState({
    //     ...this.state,
    //     socketID: data.socketId
    //   });
    //   this.socket.emit("enter chatroom", { username: this.state.username });
    // });
    // this.socket.on("recieve chat", data => {
    //   console.log("recieve chat", data);
    // });
  }

  componentWillUnmount() {
    // this.socket.emit("leave chatroom", () => {
    //   this.setState({
    //     ...this.state,
    //     socketID: null
    //   });
    // });
    // this.socket = null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.chatReducer !== this.props.chatReducer ||
      this.state !== nextState
    ) {
      return true;
    }
  }

  componentDidUpdate() {
    const chat2DList = this.state.chat2DList;
    const remove = this.state.remove;
    if (remove !== 0) {
      this.setState({
        chat2DList: chat2DList.slice(1, chat2DList.length),
        remove: remove - 1
      });
    }
  }

  scrollToBottom(flag, someRef) {
    if (someRef) {
      if (this.state.scrollIndex === flag) {
        someRef.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  render() {
    const chat1DdoSubmit = e => this.chat1DdoSubmit(e);
    const chat1DdoChange = e => this.chat1DdoChange(e);
    const chatThreadDoSubmit = e => this.chatThreadDoSubmit(e);
    const chatThreadDoChange = e => this.chatThreadDoChange(e);
    // console.log(this.state.users);

    return (
      <div className="App">
        <div className="App-clock">
          <Clock />
        </div>
        <div className="App-Blackboard">
          <Blackboard />
        </div>
        <div className="App-content">
          <Content />
        </div>
        <div className="App-ChatThread">
          <ChatThread
            chatList={this.state.chatThreadList}
            chatTopic={this.state.chat1DList[this.state.chatThreadIndex]}
            scrollToBottom={(flag, ref) => this.scrollToBottom(flag, ref)}
          />
        </div>
        <div className="App-Chat2D">
          <Chat2D chatList={this.state.chat2DList} />
        </div>
        <div className="App-Chat1D">
          <Chat1D
            chatList={this.state.chat1DList}
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

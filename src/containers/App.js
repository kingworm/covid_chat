import { connect } from "react-redux";
import * as action from "../redux/actions/actions";
import socketIOClient from "socket.io-client";
import App from "../../src/App";

const socket = socketIOClient("http://localhost:3002");

const socketSubscribe = dispatch => {
  socket.on("my socket id", data => {
    console.log("mySocketID : ", data);
    dispatch(action.mySocketId(data.socketId));
  });
  socket.on("receive chat", data => {
    console.log("App.js Socket(receive chat) ", data);
    dispatch(action.receiveChat(data));
  });
  socket.on("receive 2d chat", data => {
    console.log("App.js Socket(receive 2d chat) ", data);
    dispatch(action.receive2DChat(data));
  });
};

const mapStateToProps = state => {
  console.log("containers/App.js mapStateToProps ", state);
  return state;
};

const mapDispatchToProps = dispatch => {
  socketSubscribe(dispatch);
  return {
    enterChatroom: () => {
      socket.emit("enter chatroom");
    },
    leaveChatroom: () => {
      socket.emit("leave chatroom");
    },
    sendChat: data => {
      socket.emit("send chat", {
        type: "msg",
        socketId: socket.id,
        chat: data.chat,
        username: data.username,
        regDate: Date.now()
      });
    },
    send2DChat: data => {
      socket.emit("send 2d chat", {
        type: "msg",
        socketId: socket.id,
        chat: data.chat,
        username: data.username,
        regDate: Date.now()
      });
    },
    clearChat: () => {
      dispatch(action.clearChat());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

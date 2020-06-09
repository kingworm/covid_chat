import { connect } from "react-redux";
import * as action from "../redux/actions/actions";
import App from "../../src/App";
import { socket } from "../services/socket";

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
  socket.on("receive notice", data => {
    console.log("App.js Socket(receive notice) ", data);
    dispatch(action.receiveNotice(data));
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
    // 2. 수업 컨텐츠 url
    clearChat: () => {
      dispatch(action.clearChat());
    },
    pop2DChat: () => {
      dispatch(action.pop2DChat());
    },
    sendNotice: data => {
      socket.emit("send notice", {
        type: "msg",
        socketId: socket.id,
        notice: data.notice,
        regDate: Date.now()
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

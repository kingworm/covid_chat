import { combineReducers } from "redux";
import * as type from "../constants/actionTypes";

const chatStates = {
  chat1DList: [],
  chat2DList: [],
  chatThreadList: {},
  socketId: null
};

const chatReducer = (state = chatStates, action) => {
  switch (action.type) {
    case type.MY_SOCKET_ID:
      return { ...state, socketId: action.socketId };
    case type.RECEIVE_CHAT:
      // let newChatList = state.chatList.slice();
      // newChatList.push(action.data);
      let newChatList = state.chat1DList.concat(action.data.chat);
      return { ...state, chat1DList: newChatList };
    case type.RECEIVE_2D_CHAT:
      // let new2DChatList = state.chatList.slice();
      // new2DChatList.push(action.data);
      let new2DChatList = state.chat2DList.concat(action.data.chat);
      return { ...state, chat2DList: new2DChatList };
    // case type.RECEIVE_THREAD_CHAT:
    //   let targetThread = state.chatThreadList[action.data.threadID];
    //   let newThreadChatList = targetThread.slice();
    //   newThreadChatList.push(action.data.chat);
    //   return { ...state, chatThreadList: { ...state.chatThreadList, action.data.threadID : newThreadChatList} };
    case type.CLEAR_CHAT:
      return { ...state, chatList: [] };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ chatReducer });

export default rootReducer;

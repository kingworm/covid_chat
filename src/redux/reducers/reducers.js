import { combineReducers } from "redux";
import * as type from "../constants/actionTypes";

const chatStates = {
  chat1DList: [],
  chat2DList: [],
  chatThreadList: [],
  socketId: null,
  notice: ""
};

const chatReducer = (state = chatStates, action) => {
  switch (action.type) {
    case type.MY_SOCKET_ID:
      return { ...state, socketId: action.socketId };
    case type.RECEIVE_CHAT:
      // let newChatList = state.chatList.slice();
      // newChatList.push(action.data);
      let newChat1DList = state.chat1DList.concat(action.data.chat);
      return { ...state, chat1DList: newChat1DList };
    case type.RECEIVE_2D_CHAT:
      // let new2DChatList = state.chatList.slice();
      // new2DChatList.push(action.data);
      let new2DChatList = state.chat2DList.concat(action.data.chat);
      return { ...state, chat2DList: new2DChatList };
    case type.RECEIVE_THREAD_CHAT:
      const index = action.data.index;
      let newChatList = state.chat1DList;
      newChatList[index].chatThreadList = state.chat1DList[
        index
      ].chatThreadList.concat(action.data.chat);
      return {
        ...state,
        chat1DList: newChatList,
        chatThreadList: newChatList[index].chatThreadList
      };
    case type.POP_2D_CHAT:
      let pop2DChatList = state.chat2DList.slice(1, state.chat2DList.length);
      return { ...state, chat2DList: pop2DChatList };
    case type.CLEAR_CHAT:
      return { ...state, chat1DList: [] };
    case type.RECEIVE_NOTICE:
      return { ...state, notice: action.data.notice };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ chatReducer });

export default rootReducer;

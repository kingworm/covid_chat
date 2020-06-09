import * as type from "../constants/actionTypes";

export const sendChat = () => {
  return {
    type: type.SEND_CHAT
  };
};

export const receiveChat = data => {
  return {
    type: type.RECEIVE_CHAT,
    data
  };
};

export const send2DChat = () => {
  return {
    type: type.SEND_2D_CHAT
  };
};

export const receive2DChat = data => {
  return {
    type: type.RECEIVE_2D_CHAT,
    data
  };
};

export const sendThreadChat = () => {
  return {
    type: type.SEND_THREAD_CHAT
  };
};

export const receiveThreadChat = data => {
  return {
    type: type.RECEIVE_THREAD_CHAT,
    data
  };
};

export const clearChat = data => {
  return {
    type: type.CLEAR_CHAT,
    data
  };
};

export const mySocketId = data => {
  return {
    type: type.MY_SOCKET_ID,
    data
  };
};

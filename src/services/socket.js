import socketIOClient from "socket.io-client";

export const socket = socketIOClient("http://192.168.128.22:3002");
// export const socket = socketIOClient("http://dev.redwit.io:3002");

import socketIOClient from "socket.io-client";

export const socket = socketIOClient("localhost:3002");
// export const socket = socketIOClient("//capstone.redwit.io:3002/");

import socketIOClient from "socket.io-client";

export const socket = socketIOClient("localhost:8080");
//export const socket = socketIOClient("//capstone.redwit.io:3002/");

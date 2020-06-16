// var express = require("express");
// var app = express();
// var cors = require("cors");
// var indexRouter = require("./routes/index");
// var path = require("path");
// app.use(cors());
// app.use(indexRouter);
// var usersRouter = require("./routes/users");
// app.use("/users", usersRouter);

// // const buildPath = path.join(__dirname, "../../build");
// // console.log(buildPath);
// // app.set("views", buildPath);
// // app.set("view engine", "jade");

// // app.use(express.static(buildPath));
// // app.get("*", (req, res) => {
// // res.sendFile(path.join(__dirname, "../public/index.html"));
// // });
// // portnumber를 3002로 지정
// const port = process.env.PORT || 3002;
// // app.use(function(req, res, next) {
// //   res.setHeader("Access-Control-Allow-Origin", "*");
// //   next();
// // });
// // 3002번 포트넘버를 가진 서버 생성
// // app.listen(port, () => console.log(`listening on port ${port}!`));
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);
// io.once("connection", socket => {
//   console.log("연결된 socketID : ", socket.id);
//   io.to(socket.id).emit("my socket id", { socketId: socket.id });

//   socket.on("enter chatroom", data => {
//     console.log("누군가가 입장함", data);
//     socket.broadcast.emit("receive chat", {
//       type: "alert",
//       chat: `${data.username}님이 입장하였습니다.`,
//       regDate: Date.now()
//     });
//   });

//   socket.on("send chat", data => {
//     console.log(`${data.username}::${socket.id} : ${data.chat}`);
//     io.emit("receive chat", data);
//   });

//   socket.on("send 2d chat", data => {
//     console.log(`${data.username}::${socket.id} : ${data.chat}`);
//     io.emit("receive 2d chat", data);
//   });

//   socket.on("send thread chat", data => {
//     console.log(`${data.username}::${socket.id} : ${data.chat}`);
//     io.emit("receive thread chat", data);
//   });

//   socket.on("send notice", data => {
//     console.log(`${socket.id} : ${data.notice}`);
//     io.emit("receive notice", data);
//   });

//   socket.on("leave chatroom", data => {
//     console.log("leave chatroom ", data);
//     socket.broadcast.emit("receive chat", {
//       type: "alert",
//       chat: "누군가가 퇴장하였습니다.",
//       regDate: Date.now()
//     });
//   });

//   socket.on("disconnect", () => console.log("Client disconnected"));
// });
// server.listen(port, () => {
//   console.log(`listening port ${port}... `);
// });

var express = require("express");
var app = express();
var cors = require("cors");
var indexRouter = require("./routes/index");

app.use(cors());
app.use(indexRouter);
var usersRouter = require("./routes/users");
app.use("/users", usersRouter);
// portnumber를 3002로 지정
const port = 3002;

// 3002번 포트넘버를 가진 서버 생성
// app.listen(port, () => console.log(`listening on port ${port}!`));
const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.on("connection", socket => {
  console.log("연결된 socketID : ", socket.id);
  io.to(socket.id).emit("my socket id", { socketId: socket.id });

  socket.on("enter chatroom", data => {
    console.log("누군가가 입장함", data);
    // socket.broadcast.emit("receive chat", {
    //   type: "alert",
    //   chat: `${data.username}님이 입장하였습니다.`,
    //   regDate: Date.now()
    // });
  });

  socket.on("send chat", data => {
    console.log(`${data.username}::${socket.id} : ${data.chat}`);
    io.emit("receive chat", data);
  });

  socket.on("send 2d chat", data => {
    console.log(`${data.username}::${socket.id} : ${data.chat}`);
    io.emit("receive 2d chat", data);
  });

  socket.on("send thread chat", data => {
    console.log(`${data.username}::${socket.id} : ${data.chat}`);
    io.emit("receive thread chat", data);
  });

  socket.on("send notice", data => {
    console.log(`${data.username}::${socket.id} : ${data.notice}`);
    io.emit("receive notice", data);
  });

  socket.on("leave chatroom", data => {
    console.log("leave chatroom ", data);
    socket.broadcast.emit("receive chat", {
      type: "alert",
      chat: "누군가가 퇴장하였습니다.",
      regDate: Date.now()
    });
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});
server.listen(port, () => {
  console.log(`listening port ${port}... `);
});

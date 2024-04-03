const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
// const dotenv = require("dotenv");
const ws = new require("ws");

//створюємо вебсокет сервер

const app = express();

app.listen((PORT = 3000), () => {
  console.log("Database connection successful");
});

//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });

const wsServer = new ws.Server({ port: 5000 });

//port: 5000 - це порт на якому буде працювати вебсокет сервер, він є єдиним обов'язковим параметром
//на вебсервер можна повішати слухачів на події, які відбуваються на сервері

//on - це аналог addEventListener, тобто ми вішаємо слухача на подію connection,
// а далі вказуємо функцію, яка буде виконуватися при виникненні цієї події

const socketList = [];

wsServer.on("connection", (socket) => {
  socketList.push(socket);
  //   console.log("New frontend connected");
  setTimeout(() => {
    socket.send("Welcome to websocket server");
  }, 3000);

  socketList.forEach((item) => {
    if (item !== socket) {
      item.send("New member connected");
    }
  });
});

module.exports = app;

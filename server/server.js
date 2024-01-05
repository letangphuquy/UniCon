const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)

const Server = require('socket.io')
const io = Server(server, {
  cors: {
    origin: '*',
  },
})

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);
    let counter = 0;
  // send an event to the client
  socket.emit("foo", "bar");
  
  socket.on("foobar", (msg) => {
      // an event was received from the client
      console.log(`Client ${socket.id} interacted back: ${msg}`)
      socket.emit("foo", ++counter);
  });

  // upon disconnection
  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });
});

io.listen(3333); // APP is running on 3000 so WS server must runs on 3001


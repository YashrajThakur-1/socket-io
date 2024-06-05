const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 5000;

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

io.on("connection", (socket) => {
  console.log("Client connected");

  // Listen for message events from clients
  socket.on("message", (data) => {
    console.log("Message from client:", data);

    // Broadcast the message to all clients
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

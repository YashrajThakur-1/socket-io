const http = require("http");
const express = require("express");
const path = require("path");
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

// Socket io
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});
app.use(express.static(path.resolve("./public")));
app.get("/", async (req, res) => {
  return res.sendFile("/public/index.html");
});
server.listen(9000, () => console.log("Server running on PORT:9000"));

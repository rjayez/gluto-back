const express = require("express");
const { createServer } = require("http");
const { Server} = require("socket.io")

const app = express();
const socketServer = createServer(app);
const io = new Server(socketServer, {
    cors : {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

// io.on("connection", socket => {
//     socket.emit("notif", "Coucou !");
// })

module.exports = {socketServer, io};

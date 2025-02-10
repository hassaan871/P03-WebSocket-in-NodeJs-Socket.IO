const http = require('http');
const path = require('path');
const express = require('express');
const { Server } = require('socket.io');

const PORT = 9000;

const app = express();
const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket)=>{
    socket.on("user-message", (message)=>{
        // console.log("A new user message: ", message);
        io.emit("message", message);
    });
});

app.use(express.static(path.resolve("./public")));

app.get('/', (req, res)=>{
    res.sendFile('/public/index.html');
});

server.listen(PORT, ()=> {console.log(`server started at PORT: ${PORT}`)});
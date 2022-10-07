const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})
io.on('connection', (socket) =>{
    console.log('A client connected');
        socket.on('click', (click) =>{
            // socket.emit: used when you want to send a private message
            // io.emit: used if you want to send a message to everyone
            io.emit('new_move', click)
        })
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
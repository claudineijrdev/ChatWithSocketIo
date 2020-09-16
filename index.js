import express from 'express'
import http from 'http'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import socketIo from 'socket.io' 

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()
var server = http.createServer(app)
var io = socketIo(server)

app.get('/',(req, res) =>{
     res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
     console.log('user disconnected');
   });
   socket.on('chat message', (msg) => {
     console.log('message: ' + msg);
     io.emit('chat message', msg);
   });
});

server.listen(3000, () =>{ console.log('App listening on *:3000')})
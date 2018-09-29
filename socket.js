var socketIO = require('socket.io');
var io = socketIO();
var socket = {}
socket.io = io;



module.exports = io => {
  io.on('connection', (socket) => {
    console.log("ag")
  })
}
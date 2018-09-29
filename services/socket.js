var socketIo = require("socket.io");

var io = socketIo();
var socketApi = {io};

io.on('connection', function(socket){
  console.log('A user connected');
});

module.exports = {
  socketApi,
  
}
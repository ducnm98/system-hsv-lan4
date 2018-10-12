var socketIo = require("socket.io");

var io = socketIo();
var socketApi = {io};

io.on('connection', function(socket){
  console.log('A user connected');
});

module.exports = {
  socketApi,
  updateNumberOfDelegates: (data) => {
    let id = `totalOfDelegates-${data._id}`;
    io.emit(id, data)
  },
  updateAnalytics: (data) => {
    let id = `updateAnalytics-${data._id}`;
    io.emit(id, data)
  },
  delegatesIn: (data) => {
    io.emit('delegatesIn', data)
  },
  delegatesOut: (data) => {
    io.emit('delegatesOut', data)
  },
  currentQuestion: (data) => {
    io.emit('currentQuestion', data)
  },
  answerChange: (data) => {
    io.emit('answerChange', data)
  },
  areYouConnecting: (data) => {
    io.emit('areYouConnecting', data)
  },
  updateNumberOfDelegatesOnVotes: (data) => {
    io.emit('updateNumberOfDelegatesOnVotes', data)
  }
}
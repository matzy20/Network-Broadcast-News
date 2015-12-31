var net = require('net');

var PORT = 4567;
var socket = new net.Socket();

  socket.on('connect', function (){
    console.log('Connected to server on port ' + PORT);
    socket.write('hello');
  });

socket.connect(PORT);
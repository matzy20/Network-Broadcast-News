var net = require('net');
var PORT = 1337;

var socket = new net.Socket();

socket.setEncoding('utf8');

  socket.on('connect', function (){
    console.log('hey I connected ' + PORT);
    // process.stdin.on('data', function (data){
    // });
  });

  process.stdin.on('data', function (data) {
    //removed stdout since it's going to server vs terminal
    //need socket just to write
    socket.write(data);
  });

  //need to have this for when the server returns/spits back data
  socket.on('data', function (data){
    console.log(data);
  });

socket.connect(PORT);
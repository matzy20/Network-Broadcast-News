var net = require('net');

//need server running to have client work
//make a chat with multiple connections

var PORT = 1337;
var server = net.createServer(connectionListener);

//made this global so everyone can access
var allClients = [];

function connectionListener(socket){

  //this is the very FIRST time socket connects
  allClients.push(socket);
  console.log('Client connected!');

  socket.setEncoding('utf8');
  server.getConnections(function (err, length) {
    console.log(length);
  });

  //broadcast to all sockets/clients
  socket.on('data', function (data) {
    console.log(data);
    for (var i =0; i < allClients.length; i++){
      // console.log("hey you", allClients[i]);
      allClients[i].write(data);
    }
  });

  socket.on('end', function (){
    console.log('Socket ended');
    server.getConnections(function (err, length){
      console.log(length);
    });
  });
}

server.listen(PORT, function() {
  console.log('Server listening on port ' + PORT);
});
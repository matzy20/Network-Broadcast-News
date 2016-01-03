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
    //moved console.log higher vs under allClients[i].write(data);
    //this way, it will always console.log vs only after deciding if you're not current client sending data
    console.log(data);
    for (var i =0; i < allClients.length; i++){
      //if no the current client writing data to socket, then ..
      if (allClients[i] !== socket){
       allClients[i].write(data);
      }
    }
  });

  socket.on('end', function (){

    allClients.splice(socket, 1);
      console.log('left the chat');
    server.getConnections(function (err, length){
      console.log('Socket ended leaving only ', length);
    });
  });
}
server.listen(PORT, function() {
  console.log('Server listening on port ' + PORT);
});
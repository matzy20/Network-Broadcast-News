var net = require('net');

var PORT = 4567;
var server = net.createServer(connectionListener);

function connectionListener(socket){
  socket.setEncoding('utf8');
  console.log('Client connected!');

  socket.on('data', function (data) {
    console.log(data);
  });
}


server.listen(PORT, function() {
  console.log('Server listening on port ' + PORT);
});
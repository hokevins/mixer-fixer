const Express = require('express');
const app = Express();
const Server = require('http').Server(app);
const io = require('socket.io')(Server);
const path = require('path');

Server.listen(1337);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function (socket) {
  console.log('???????', socket.id);
  socket.on('update', (data) => {
    console.log('!!!!!!!', data);
    io.emit('update');
  });
});

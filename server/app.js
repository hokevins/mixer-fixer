const express = require('express');
const app = express();
const socketio = require('socket.io');
// const io = require('socket.io')(server);
const path = require('path');

const PORT = process.env.PORT || 1337;

const server = app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${server.address().port}`);
});

// server.listen(PORT, () => {
//   console.log(`The collective is listening on PORT ${PORT}.`);
// });

const io = socketio(server);

io.on('connection', (socket) => {
  console.log(`A socket connection made to: ${socket.id}.`);
  socket.on('disconnect', () => {
    console.log(`Connection ${socket.id} has left the building.`);
  });
  socket.on('update', () => {
    socket.broadcast.emit('update');
  });
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

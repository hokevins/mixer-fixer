const express = require('express');
const app = express();
const socketio = require('socket.io');
// const io = require('socket.io')(server);
const path = require('path');

const PORT = process.env.PORT || 1337;

const server = app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${server.address().port}`);
});

const io = socketio(server);

const { USER_CONNECTED, VERIFY_USER } = require('../Events');
const { createUser } = require('../Factories');

let connectedUsers = {};

io.on('connection', (socket) => {
  console.log(`A socket connection made to: ${socket.id}.`);
  socket.on('disconnect', () => {
    console.log(`Connection ${socket.id} has left the building.`);
  });
  socket.on('update', () => {
    socket.broadcast.emit('update');
  });
  socket.on(VERIFY_USER, (name, callback) => {
    if (isUser(connectedUsers, name)) {
      callback({ isUser: true, user: null});
    } else {
      callback({ isUser: false, user: createUser({ name })});
    }
  });
  socket.on(USER_CONNECTED, (user) => {
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user.name;
    socket.broadcast.emit(USER_CONNECTED, connectedUsers);
  });
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

function isUser(userList, username) {
  return username in userList;
}

function addUser(userList, user) {
  let newList = Object.assign({}, userList);
  newList[user.user.name || user.name] = user;
  return newList;
}

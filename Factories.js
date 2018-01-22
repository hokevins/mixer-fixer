const uuidv4 = require('uuid/v4');

// utility function returns a string represented in 24hr time i.e. '11:30', '19:30'
const getTime = (date) => {
  return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
};

const createUser = ({name = ''} = {}) => {
  return {
    id: uuidv4(),
    name
  };
};

// For future implementation:
const createMessage = ({message = '', sender = ''} = {}) => {
  return {
    id: uuidv4(),
    time: getTime(new Date(Date.now())),
    message,
    sender
  };
};

// For future implementation:
const createChat = ({messages = [], name = 'Community', users = []} = {}) => {
  return {
    id: uuidv4(),
    name,
    messages,
    users,
    typingUsers: []
  };
};

module.exports = {
  createUser,
  createMessage,
  createChat
};

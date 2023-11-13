let io;

module.exports = {
  init: (httpServer) => {
    io = require('socket.io')(httpServer, {
      cors: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELELE'],
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io is not initialized!');
    } else {
      return io;
    }
  },
};

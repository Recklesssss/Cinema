const Messages = require('../Models/chatModel');

exports.handleSocketEvents = (socket, io) => {
  socket.on('message', async (message, sender, roomId) => {
    try {
      const savedMessage = await Messages.postMessages(message, sender, roomId);
      io.to(roomId).emit('message', savedMessage);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });
};
exports.getMessages = async (roomId) => {
    const messages = await Messages.getMessages(roomId);
   return messages;
}

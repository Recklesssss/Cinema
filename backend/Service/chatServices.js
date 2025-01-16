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
const rooms = {}
  socket.on('joinRoom', (roomId) => {
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    const existingParticipant = rooms[roomId].find((p) => p.id === socket.id);
  if (!existingParticipant) {
    const newParticipant = {
      id: socket.id,
      name: `User ${socket.id.slice(0, 5)}`,
      videoEnabled: true,
      audioEnabled: true,
    };
    rooms[roomId].push(newParticipant);
  }
    socket.join(roomId);
    io.to(roomId).emit('participants', rooms[roomId]);

    socket.on("signal",({peerId,signal})=>{
      io.to(peerId).emit("signal",{peerId:socket.id,signal});
    });

    socket.on("updateMediaState", ({ videoEnabled, audioEnabled }) => {
      const participant = rooms[roomId].find((p) => p.id === socket.id);
      if (participant) {
        if (videoEnabled !== undefined) participant.videoEnabled = videoEnabled;
        if (audioEnabled !== undefined) participant.audioEnabled = audioEnabled;
        io.to(roomId).emit("participants", rooms[roomId]);
      }
    });

    console.log(`User joined room: ${roomId}`);
  });
  socket.on('leaveRoom', ({ roomId, userId }) => {
    socket.leave(roomId);
    console.log(`User ${userId} left room ${roomId}`);
  });
};
exports.getMessages = async (roomId) => {
    const messages = await Messages.getMessages(roomId);
   return messages;
}
//chatServices.js
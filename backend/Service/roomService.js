const roomModel = require('../Models/roomModels');

exports.createRoom = async (roomName, creatorId, movieId) => {
  return await roomModel.createRoom(roomName, creatorId, movieId);
};

exports.joinRoom = async (roomId, userId) => {
  return await roomModel.joinroom(roomId, userId);
};

exports.deleteRoom = async (roomId) => {
  return await roomModel.deleteRoom(roomId);
};
exports.kickUser = async (roomId, userId) => {  
  return await roomModel.kickUser(roomId, userId);
};

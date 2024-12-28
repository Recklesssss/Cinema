const roomModel = require('../Models/roomModels');

exports.createRoom = async (roomName, creatorId) => {
  return await roomModel.createRoom(roomName, creatorId);
};

exports.joinRoom = async (roomId, userId) => {
  return await roomModel.joinRoom(roomId, userId);
};

exports.deleteRoom = async (roomId) => {
  return await roomModel.deleteRoom(roomId);
};
exports.kickUser = async (roomId, userId) => {  
  return await roomModel.kickUser(roomId, userId);
};

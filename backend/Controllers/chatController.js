const roomService = require('../Service/roomService');

exports.createRoom = async (roomName, creatorId) => {
  try {
    // Call the service to create a room
    const room = await roomService.createRoom(roomName, creatorId);
    return { success: true, roomId: room.room_id };
  } catch (error) {
    console.error('Error creating room:', error.message);
    return { success: false, message: error.message };
  }
};
exports.joinRoom = async (roomId, userId) => {
  try {
    // Call the service to join a room
    const room = await roomService.joinRoom(roomId, userId);
    return { success: true, room: room };
  } catch (error) {
    console.error('Error joining room:', error.message);
    return { success: false, message: error.message };
  }
};
exports.deleteRoom = async (roomId) => {
  try {
    // Call the service to delete a room
    await roomService.deleteRoom(roomId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting room:', error.message);
    return { success: false, message: error.message };
  }
};
exports.kickUser = async (roomId, userId) => {
  try {
    // Call the service to kick a user from a room
    const room = await roomService.kickUser(roomId, userId);
    return { success: true, room: room };
  } catch (error) {
    console.error('Error kicking user:', error.message);
    return { success: false, message: error.message };
  }
};  
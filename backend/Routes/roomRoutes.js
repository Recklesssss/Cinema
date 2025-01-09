const express = require('express');
const router = express.Router();
const roomController = require('../Controllers/chatController');

router.post('/create', async (req, res) => {
  const { roomName, creatorId, movieId } = req.body;
  const result = await roomController.createRoom(roomName, creatorId, movieId);
  if (result.success) {
    res.status(201).json({ success: true, roomId: result.roomId });
  } else {
    res.status(500).json({ success: false, message: result.message });
  }
});

router.post('/join', async (req, res) => {
  const {userId, roomId } = req.body;
  const result = await roomController.joinRoom(userId, roomId);
  if (result.success) {
    res.status(200).json({ success: true, room: result.room });
  } else {
    res.status(500).json({ success: false, message: result.message });
  }
});

router.delete('/delete', async (req, res) => {
  const { roomId } = req.body;
  const result = await roomController.deleteRoom(roomId);
  if (result.success) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ success: false, message: result.message });
  }
});
router.delete('/kick', async (req, res) => {
  const { roomId, userId } = req.body;
  const result = await roomController.kickUser(roomId, userId);
  if (result.success) {
    res.status(200).json({ success: true, room: result.room });
  } else {
    res.status(500).json({ success: false, message: result.message });
  }
});

module.exports = router;

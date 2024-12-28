const express = require('express');
const router = express.Router();
const roomController = require('../controllers/chatController');

router.post('/create', async (req, res) => {
  const { roomName, creatorId } = req.body;
  const result = await roomController.createRoom(roomName, creatorId);
  if (result.success) {
    res.status(201).json({ success: true, roomId: result.roomId });
  } else {
    res.status(500).json({ success: false, message: result.message });
  }
});

router.post('/join', async (req, res) => {
  const { roomId, userId } = req.body;
  const result = await roomController.joinRoom(roomId, userId);
  if (result.success) {
    res.status(200).json({ success: true, room: result.room });
  } else {
    res.status(500).json({ success: false, message: result.message });
  }
});

module.exports = router;

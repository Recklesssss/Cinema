const express = require('express');
const router = require('express').Router();
const messageController = require('../Controllers/messageController');

router.get('/messages/:roomId', messageController.getMessages);

module.exports = router;
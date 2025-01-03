const message = require('../Service/chatServices');

exports.getMessages = async (req, res) => {
  const { roomId } = req.params;
  try {
    const messages = await message.getMessages(roomId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
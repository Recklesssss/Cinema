const userService = require('../Service/userService');

exports.registerUser = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json(user);  // Respond with the created user
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const token = await userService.login(req.body);
    res.status(200).json({ token });  // Respond with JWT token
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.id);  // Accessing user from JWT payload
    res.status(200).json(user);  // Respond with the user's profile
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

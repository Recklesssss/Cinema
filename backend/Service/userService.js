const bcrypt = require('bcryptjs');
const userModel = require('../Models/userModel');
const jwt = require('jsonwebtoken');

exports.register = async (userData) => {
  console.log('Received registration data:', userData);
  const { email, password, name } = userData;
  // Check if the user already exists
  

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData1 = { email, password: hashedPassword, name }

  // Create the user in the database
  return await userModel.create(userData1);
};

exports.login = async ({ email, password }) => {
  const user = await userModel.findByEmail(email);
  if (!user) throw new Error('Invalid email or password.');

  // Check if the password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password.');

  // Generate a JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

exports.getProfile = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) throw new Error('User not found.');
  return user;
};

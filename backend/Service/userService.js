const userModel = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (userData) => {
  const { email, password, name } = userData;

  // Check if the user already exists
  const existingUser = await userModel.findByEmail(email);
  if (existingUser) throw new Error('Email is already registered.');

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user in the database
  return await userModel.create({ email, password: hashedPassword, name });
};

exports.login = async ({ email, password }) => {
  const user = await userModel.findByEmail(email);
  if (!user) throw new Error('Invalid email or password.');

  // Check if the password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password.');

  // Generate a JWT token
  const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });
  console.log(token)
  return token;
};

exports.getProfile = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) throw new Error('User not found.');
  return user;
};

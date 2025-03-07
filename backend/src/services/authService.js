import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../models/userModel.js';

const registerUser = async (user) => {
  const { email, password, name, skills, causes } = user;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser({ email, password: hashedPassword, name, skills, causes });
  return newUser;
};

const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { user, token };
};

export { registerUser, loginUser };
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../user/user.model';
import config from '../../app/config';


const register = async (payload: {
  name: string;
  id: string;
  email: string;
  password: string;
  role?: string;
}) => {
  const existingUser = await User.findOne({ id: payload.id });
  if (existingUser) throw new Error('User already exists with this ID');

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });

  return {
    _id: user._id,
    name: user.name,
    id: user.id,
    email: user.email,
    role: user.role,
  };
};

const login = async (payload: { id: string; password: string }) => {
  console.log('Trying to login with ID:', payload.id);
const user = await User.findOne({ id: payload.id }).select('+password');
console.log('User from DB:', user);
  if (!user) throw new Error('User not found!');

  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatched) throw new Error('Incorrect password!');

  const jwtPayload = {
    _id: user._id,
    id: user.id,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt.access_secret, {
    expiresIn: '15d',
  });

  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      id: user.id,
      role: user.role,
    },
  };
};

export const authService = {
  register,
  login,
};

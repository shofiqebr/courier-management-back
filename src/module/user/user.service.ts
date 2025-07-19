/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateQuery } from 'mongoose';
import { User } from './user.model';


interface IUserFilter {
  searchTerm?: string;
  role?: string;
}

const getAllUsers = async (filters: IUserFilter, page = 1, limit = 10, sortBy = 'createdAt', sortOrder: 'asc' | 'desc' = 'asc') => {
  const skip = (page - 1) * limit;

  const { searchTerm, role } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { id: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
      ],
    });
  }

  if (role) {
    andConditions.push({ role });
  }

  const query = andConditions.length > 0 ? { $and: andConditions } : {};

  const users = await User.find(query)
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(limit)
    .select('-password');

  const total = await User.countDocuments(query);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: users,
  };
};

const getSingleUser = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  return user;
};

const updateUser = async (userId: string, payload: UpdateQuery<any>) => {
  const updatedUser = await User.findByIdAndUpdate(userId, payload, { new: true }).select('-password');
  return updatedUser;
};

const deleteUser = async (userId: string) => {
  await User.findByIdAndDelete(userId);
};


const updateLocation = async (userId: string, lat: number, lng: number) => {
  const user = await User.findById(userId);
  if (!user || user.role !== 'agent') {
    throw new Error('Only delivery agents can update location');
  }

  user.location = { lat, lng };
  await user.save();

  return user.location;
};



export const userService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  updateLocation
};

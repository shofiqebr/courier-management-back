/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';
import { StatusCodes } from 'http-status-codes';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const { searchTerm, role, page = '1', limit = '10', sortBy, sortOrder } = req.query;

  const filters = {
    searchTerm: searchTerm as string | undefined,
    role: role as string | undefined,
  };

  const result = await userService.getAllUsers(filters, Number(page), Number(limit), sortBy as string, sortOrder as 'asc' | 'desc' || 'asc');

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: true,
    message: 'Users fetched successfully',
    data: result.data,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getSingleUser(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: true,
    message: 'User fetched successfully',
    data: user,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const updatedUser = await userService.updateUser(id, payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: true,
    message: 'User updated successfully',
    data: updatedUser,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await userService.deleteUser(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: true,
    message: 'User deleted successfully',
    data: undefined
  });
});

const updateLocation = catchAsync(async (req: Request, res: Response) => {
  const { lat, lng } = req.body;
  const agentId = (req.user as any)._id;

  if (!agentId || typeof lat !== 'number' || typeof lng !== 'number') {
     res.status(StatusCodes.BAD_REQUEST).json({
      status: false,
      message: 'Latitude and Longitude are required',
    });
    return;
  }

  const updatedLocation = await userService.updateLocation(agentId, lat, lng);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: true,
    message: 'Location updated successfully',
    data: updatedLocation,
  });
});

export const userController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  updateLocation
};

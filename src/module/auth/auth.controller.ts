import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';
import { StatusCodes } from 'http-status-codes';

const register = catchAsync(async (req: Request, res: Response) => {
  console.log('Request body:', req.body); // 👀 Check this in terminal

  const result = await authService.register(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: true,
    message: 'User registered successfully',
    data: result,
  });
});


const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);

  res.cookie('token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });

  sendResponse(res, {
    statusCode: StatusCodes.ACCEPTED,
    status: true,
    message: 'User logged in successfully',
    data: result,
  });
});

export const authController = {
  register,
  login,
};

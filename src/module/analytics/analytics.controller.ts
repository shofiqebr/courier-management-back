import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { analyticsService } from './analytics.service';

const getStats = catchAsync(async (_req: Request, res: Response) => {
  const stats = await analyticsService.getParcelStats();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: true,
    message: 'Parcel analytics fetched successfully',
    data: stats,
  });
});

export const analyticsController = {
  getStats,
};

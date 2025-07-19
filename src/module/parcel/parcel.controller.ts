/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { parcelService } from './parcel.service';
import { StatusCodes } from 'http-status-codes';

const createParcel = catchAsync(async (req: Request, res: Response) => {
  const customerId = (req.user as any)?._id;

  if (!customerId) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: false,
      message: 'Unauthorized: Customer ID missing from token',
    });
    return; // exit the function here
  }

  const result = await parcelService.createParcel(req.body, customerId);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: true,
    message: 'Parcel created successfully',
    data: result,
  });
});


const getAllParcels = catchAsync(async (_req: Request, res: Response) => {
  const result = await parcelService.getAllParcels();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: true,
    message: 'All parcels retrieved',
    data: result,
  });
});

const getMyParcels = catchAsync(async (req: Request, res: Response) => {
  const customerId = (req.user as any)?._id;
  const result = await parcelService.getParcelsByCustomer(customerId!);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: true,
    message: 'Customer bookings fetched',
    data: result,
  });
});

const getSingleParcel = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await parcelService.getParcelById(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: true,
    message: 'Parcel fetched successfully',
    data: result,
  });
});

const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const parcelId = req.params.id;
  const agentId = req.user?.id;
  const { status } = req.body;

  if (!agentId) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: false,
      message: 'Unauthorized: Delivery agent ID missing from token',
    });
    return;
  }

  const result = await parcelService.updateParcelStatus(parcelId, agentId, status);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: true,
    message: 'Parcel status updated successfully',
    data: result,
  });
});

const assignAgent = catchAsync(async (req: Request, res: Response) => {
  const { parcelId, agentId } = req.body;

  if (!parcelId || !agentId) {
    res.status(400).json({
      status: false,
      message: 'parcelId and agentId are required',
    });
    return;
  }

  const result = await parcelService.assignAgentToParcel(parcelId, agentId);

  sendResponse(res, {
    statusCode: 200,
    status: true,
    message: 'Agent assigned to parcel successfully',
    data: result,
  });
});



export const parcelController = {
  createParcel,
  getAllParcels,
  getMyParcels,
  getSingleParcel,
  updateStatus,
  assignAgent
};

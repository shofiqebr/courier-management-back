import { Router } from 'express';
import { parcelController } from './parcel.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import {  ParcelValidation } from './parcel.validation';

const parcelRouter = Router();

parcelRouter.post(
  '/parcel',
  auth(['customer']),
  validateRequest(ParcelValidation.createParcelZodSchema),
  parcelController.createParcel
);

parcelRouter.get(
  '/parcel/my-bookings',
  auth(['customer']),
  parcelController.getMyParcels
);

parcelRouter.get(
  '/parcel/:id',
  auth(['admin', 'customer', 'delivery']),
  parcelController.getSingleParcel
);

parcelRouter.get(
  '/parcel',
  auth(['admin']),
  parcelController.getAllParcels
);

parcelRouter.patch(
  '/parcel/:id/status',
  auth(['delivery']),
  validateRequest(ParcelValidation.updateStatusSchema),
  parcelController.updateStatus
);

parcelRouter.post(
  '/parcel/assign-agent',
  auth(['admin']),
  parcelController.assignAgent
);


export default parcelRouter;

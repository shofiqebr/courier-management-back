import { Types } from 'mongoose';

export type ParcelStatus = 'Pending' | 'Assigned' | 'Picked Up' | 'In Transit' | 'Delivered' | 'Failed';

export interface IParcel {
  _id?: Types.ObjectId;
  customer: Types.ObjectId; // linked to User (Customer)
  deliveryAgent?: Types.ObjectId; // linked to User (Delivery Agent)
  pickupAddress: string;
  deliveryAddress: string;
  parcelType: 'Small' | 'Medium' | 'Large' | 'Fragile' | 'Document';
  isCOD: boolean;
  amount: number;
  status: ParcelStatus;
  trackingId: string;
  pickupCoordinates?: {
    lat: number;
    lng: number;
  };
  deliveryCoordinates?: {
    lat: number;
    lng: number;
  };
  statusHistory?: {
  status: ParcelStatus;
  updatedAt: Date;
}[];

  createdAt?: Date;
  updatedAt?: Date;
}

import { Schema, model, Types } from 'mongoose';
import { IParcel } from './parcel.interface';

const parcelSchema = new Schema<IParcel>(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deliveryAgent: { type: Types.ObjectId, ref: 'User' },
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    parcelType: {
      type: String,
      enum: ['Small', 'Medium', 'Large', 'Fragile', 'Document'],
      required: true,
    },
    isCOD: { type: Boolean, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Assigned', 'Picked Up', 'In Transit', 'Delivered', 'Failed'],
      default: 'Pending',
    },
    trackingId: { type: String, required: true, unique: true },
    pickupCoordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    deliveryCoordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

export const Parcel = model<IParcel>('Parcel', parcelSchema);

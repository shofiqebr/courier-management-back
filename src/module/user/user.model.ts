import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
      unique: true, 
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, 
    },
    role: {
      type: String,
      enum: ['admin', 'agent', 'customer'],
      default: 'customer',
    },
       location: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true }
);

export const User = model('User', UserSchema);

import { Parcel } from './parcel.model';
import { IParcel } from './parcel.interface';
import { v4 as uuidv4 } from 'uuid';
import { Types } from 'mongoose';

const createParcel = async (data: Partial<IParcel>, customerId: string) => {
  const trackingId = uuidv4().slice(0, 8).toUpperCase(); // Generate tracking ID

  const parcel = await Parcel.create({
    ...data,
    customer: customerId,
    trackingId,
  });

  return parcel;
};

const getAllParcels = async () => {
  return Parcel.find().populate('customer').populate('deliveryAgent');
};

const getParcelsByCustomer = async (customerId: string) => {
  return Parcel.find({ customer: customerId }).populate('deliveryAgent');
};

const getParcelById = async (id: string) => {
  return Parcel.findById(id).populate('customer').populate('deliveryAgent');
};

const updateParcelStatus = async (
  parcelId: string,
  deliveryAgentId: string,
  newStatus: IParcel['status']
) => {
  const parcel = await Parcel.findById(parcelId);

  if (!parcel) throw new Error('Parcel not found');

  if (!parcel.deliveryAgent || parcel.deliveryAgent.toString() !== deliveryAgentId) {
    throw new Error('You are not assigned to this parcel');
  }

  parcel.status = newStatus;

  // Optionally push to status history
  parcel.statusHistory = parcel.statusHistory || [];
  parcel.statusHistory.push({ status: newStatus, updatedAt: new Date() });

  await parcel.save();
  return parcel;
};

const assignAgentToParcel = async (parcelId: string, agentId: string) => {
  const parcel = await Parcel.findById(parcelId);
  if (!parcel) throw new Error('Parcel not found');

  parcel.deliveryAgent = new Types.ObjectId(agentId); // 
  parcel.status = 'Assigned';

  await parcel.save();
  return parcel;
};




export const parcelService = {
  createParcel,
  getAllParcels,
  getParcelsByCustomer,
  getParcelById,
  updateParcelStatus,
  assignAgentToParcel
};

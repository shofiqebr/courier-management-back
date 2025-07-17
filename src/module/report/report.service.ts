import { Parcel } from '../parcel/parcel.model';
import { Parser } from 'json2csv';

const exportParcelsToCSV = async () => {
  const parcels = await Parcel.find()
    .populate('customer', 'name email')
    .populate('deliveryAgent', 'name email');

  const formatted = parcels.map((p) => ({
    trackingId: p.trackingId,
    status: p.status,
    customer: (p.customer as any)?.name || 'N/A',
    deliveryAgent: (p.deliveryAgent as any)?.name || 'N/A',
    amount: p.amount,
    isCOD: p.isCOD ? 'COD' : 'Prepaid',
    pickupAddress: p.pickupAddress,
    deliveryAddress: p.deliveryAddress,
    createdAt: p.createdAt?.toISOString(),
  }));

  const parser = new Parser();
  const csv = parser.parse(formatted);

  return csv;
};

export const reportService = {
  exportParcelsToCSV,
};

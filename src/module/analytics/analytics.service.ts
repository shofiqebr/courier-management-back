import { Parcel } from '../parcel/parcel.model';

const getParcelStats = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of today

  const dailyBookings = await Parcel.countDocuments({
    createdAt: { $gte: today },
  });

  const failedDeliveries = await Parcel.countDocuments({
    status: 'Failed',
  });

  const codParcels = await Parcel.find({ isCOD: true });
  const codAmount = codParcels.reduce((total, parcel) => total + parcel.amount, 0);

  return {
    dailyBookings,
    failedDeliveries,
    codAmount,
  };
};

export const analyticsService = {
  getParcelStats,
};

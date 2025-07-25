import { Parcel } from '../parcel/parcel.model';
import { User } from '../user/user.model';

const getParcelStats = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    totalParcels,
    pendingDeliveries,
    completedDeliveries,
    cancelledParcels,
    failedDeliveries,
    codParcels,
    totalUsers,
    deliveryAgents,
    dailyBookings,
  ] = await Promise.all([
    Parcel.countDocuments(),
    Parcel.countDocuments({ status: 'Pending' }),
    Parcel.countDocuments({ status: 'Delivered' }),
    Parcel.countDocuments({ status: 'Cancelled' }),
    Parcel.countDocuments({ status: 'Failed' }),
    Parcel.find({ isCOD: true }),
    User.countDocuments(),
    User.countDocuments({ role: 'delivery-agent' }),
    Parcel.countDocuments({ createdAt: { $gte: today } }),
  ]);

  const codAmount = codParcels.reduce((sum, parcel) => sum + parcel.amount, 0);

  return {
    totalParcels,
    pendingDeliveries,
    completedDeliveries,
    cancelledParcels,
    failedDeliveries,
    codAmount,
    totalUsers,
    deliveryAgents,
    dailyBookings,
  };
};


export const analyticsService = {
  getParcelStats,
};

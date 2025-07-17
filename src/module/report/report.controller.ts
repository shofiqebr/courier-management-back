import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { reportService } from './report.service';

const exportCSV = catchAsync(async (_req: Request, res: Response) => {
  const csv = await reportService.exportParcelsToCSV();

  res.header('Content-Type', 'text/csv');
  res.attachment('parcel-report.csv');
  res.send(csv); // ✅ No need to use sendResponse here since it's a file download
});

export const reportController = {
  exportCSV,
};

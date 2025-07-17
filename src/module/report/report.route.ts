import express from 'express';
import auth from '../../middlewares/auth';
import { reportController } from './report.controller';

const router = express.Router();

router.get('/export', auth(['admin']), reportController.exportCSV);

export const reportRoutes = router;

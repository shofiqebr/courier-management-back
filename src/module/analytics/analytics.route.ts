import express from 'express';
import { analyticsController } from './analytics.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/analytics/stats', auth(['admin']), analyticsController.getStats);

export const analyticsRoutes = router;

import express from 'express';
import { authMiddleware, adminOnly } from '../middleware/authMiddleware.js';
import { validate, pageViewSchema } from '../utils/validators.js';
import * as analyticsController from '../controllers/analyticsController.js';

const router = express.Router();

// All analytics routes require authentication
router.use(authMiddleware);

// Track page view
router.post('/pageview', validate(pageViewSchema), analyticsController.trackPageView);

// Session management
router.post('/session/heartbeat', analyticsController.sessionHeartbeat);
router.post('/session/end', analyticsController.endSession);

// Analytics dashboards (admin only)
router.get('/dashboard', adminOnly, analyticsController.getAnalyticsDashboard);

// Individual investor analytics (self or admin)
router.get('/investor/:id', analyticsController.getInvestorAnalytics);

export default router;

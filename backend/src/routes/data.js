import express from 'express';
import { authMiddleware, adminOnly } from '../middleware/authMiddleware.js';
import { validate, businessDataSchema } from '../utils/validators.js';
import * as dataController from '../controllers/dataController.js';

const router = express.Router();

// Public route - get all business data (for frontend)
router.get('/all', dataController.getAllData);

// Protected routes
router.use(authMiddleware);

// Admin-only routes
router.put('/update', adminOnly, validate(businessDataSchema), dataController.updateData);
router.get('/history/:key', adminOnly, dataController.getDataHistory);
router.post('/sync', adminOnly, dataController.syncFromSheets);

export default router;

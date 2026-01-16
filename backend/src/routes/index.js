import express from 'express';
import authRoutes from './auth.js';
import analyticsRoutes from './analytics.js';
import ocrRoutes from './ocr.js';
import dataRoutes from './data.js';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'CDC Investor Portal API is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Mount route handlers
router.use('/auth', authRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/ocr', ocrRoutes);
router.use('/data', dataRoutes);

// 404 handler
router.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

export default router;

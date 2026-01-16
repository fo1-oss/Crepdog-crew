import { processDocumentWithJob } from '../services/ocrService.js';
import { checkForUpdates } from '../services/driveMonitor.js';
import prisma from '../config/database.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manual OCR processing trigger
export const processOCR = async (req, res) => {
    try {
        console.log('🔄 Manual OCR processing triggered');

        // Trigger Drive check
        checkForUpdates();

        res.json({
            success: true,
            message: 'OCR processing started. Check status for progress.'
        });
    } catch (error) {
        console.error('OCR process error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to start OCR processing'
        });
    }
};

// Upload document for OCR
export const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const { documentType } = req.validatedBody;
        const file = req.file;

        console.log(`📤 Processing uploaded file: ${file.originalname}`);

        // Process the uploaded file
        const result = await processDocumentWithJob(file.path, documentType);

        // Clean up uploaded file
        await fs.unlink(file.path);

        res.json({
            success: true,
            message: 'Document processed successfully',
            data: result
        });
    } catch (error) {
        console.error('Upload OCR error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process uploaded document'
        });
    }
};

// Get OCR job status
export const getJobStatus = async (req, res) => {
    try {
        const { jobId } = req.params;

        const job = await prisma.ocrJob.findUnique({
            where: { id: jobId }
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        res.json({
            success: true,
            data: { job }
        });
    } catch (error) {
        console.error('Get job status error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get job status'
        });
    }
};

// Get OCR processing history
export const getOCRHistory = async (req, res) => {
    try {
        const { limit = 20, offset = 0 } = req.query;

        const jobs = await prisma.ocrJob.findMany({
            take: parseInt(limit),
            skip: parseInt(offset),
            orderBy: { startedAt: 'desc' },
            include: {
                _count: true
            }
        });

        const total = await prisma.ocrJob.count();

        res.json({
            success: true,
            data: {
                jobs,
                pagination: {
                    total,
                    limit: parseInt(limit),
                    offset: parseInt(offset)
                }
            }
        });
    } catch (error) {
        console.error('Get OCR history error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get OCR history'
        });
    }
};

// Get all processed documents
export const getDocuments = async (req, res) => {
    try {
        const { documentType } = req.query;

        const filter = {};
        if (documentType) {
            filter.documentType = documentType;
        }

        const documents = await prisma.documentVersion.findMany({
            where: filter,
            orderBy: { processedAt: 'desc' }
        });

        res.json({
            success: true,
            data: { documents }
        });
    } catch (error) {
        console.error('Get documents error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get documents'
        });
    }
};

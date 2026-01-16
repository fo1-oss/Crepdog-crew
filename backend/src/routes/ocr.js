import express from 'express';
import multer from 'multer';
import { authMiddleware, adminOnly } from '../middleware/authMiddleware.js';
import { validate, ocrUploadSchema } from '../utils/validators.js';
import * as ocrController from '../controllers/ocrController.js';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
    dest: 'temp/uploads/',
    limits: {
        fileSize: (process.env.OCR_MAX_FILE_SIZE_MB || 10) * 1024 * 1024 // 10MB default
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel'];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF, images, and Excel files are allowed.'));
        }
    }
});

// All OCR routes require admin authentication
router.use(authMiddleware);
router.use(adminOnly);

// Manual OCR processing trigger
router.post('/process', ocrController.processOCR);

// Upload document for OCR
router.post('/upload', upload.single('document'), validate(ocrUploadSchema), ocrController.uploadDocument);

// Get OCR job status
router.get('/status/:jobId', ocrController.getJobStatus);

// Get OCR processing history
router.get('/history', ocrController.getOCRHistory);

// Get all processed documents
router.get('/documents', ocrController.getDocuments);

export default router;

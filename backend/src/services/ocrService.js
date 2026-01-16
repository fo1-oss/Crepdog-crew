import vision from '@google-cloud/vision';
import prisma from '../config/database.js';
import fs from 'fs/promises';
import path from 'path';

// Initialize Google Cloud Vision client
// Support both API key and service account authentication
const visionClientConfig = process.env.GOOGLE_CLOUD_API_KEY
    ? { apiKey: process.env.GOOGLE_CLOUD_API_KEY }
    : { keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS };

const visionClient = new vision.ImageAnnotatorClient(visionClientConfig);

// Process image/PDF with OCR
export const processDocument = async (filePath, documentType) => {
    try {
        console.log(`📄 Processing document: ${filePath}`);

        // Read file
        const fileBuffer = await fs.readFile(filePath);

        // Perform OCR using Google Cloud Vision
        const [result] = await visionClient.textDetection(fileBuffer);
        const detections = result.textAnnotations;

        if (!detections || detections.length === 0) {
            throw new Error('No text detected in document');
        }

        // First annotation contains all text
        const fullText = detections[0].description;

        console.log(`✅ OCR completed. Extracted ${fullText.length} characters`);

        return {
            fullText,
            detections: detections.slice(1) // Individual word detections
        };
    } catch (error) {
        console.error('OCR processing error:', error);
        throw error;
    }
};

// Process PDF (convert pages to images first)
export const processPDF = async (pdfPath) => {
    try {
        // For PDF processing, we'll use pdf-parse to extract text
        // For images in PDFs, we'd need to convert to images first
        const pdfParse = (await import('pdf-parse')).default;
        const dataBuffer = await fs.readFile(pdfPath);
        const data = await pdfParse(dataBuffer);

        return {
            fullText: data.text,
            numPages: data.numpages
        };
    } catch (error) {
        console.error('PDF processing error:', error);
        throw error;
    }
};

// Process Excel file
export const processExcel = async (excelPath) => {
    try {
        const XLSX = (await import('xlsx')).default;
        const workbook = XLSX.readFile(excelPath);

        let allText = '';
        const sheets = {};

        workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Convert to text
            const sheetText = jsonData
                .map(row => row.join(' | '))
                .join('\n');

            allText += `\n--- Sheet: ${sheetName} ---\n${sheetText}\n`;
            sheets[sheetName] = jsonData;
        });

        return {
            fullText: allText,
            sheets
        };
    } catch (error) {
        console.error('Excel processing error:', error);
        throw error;
    }
};

// Create OCR job
export const createOcrJob = async (documentId) => {
    return await prisma.ocrJob.create({
        data: {
            documentId,
            status: 'PENDING',
            progress: 0
        }
    });
};

// Update OCR job status
export const updateOcrJob = async (jobId, updates) => {
    return await prisma.ocrJob.update({
        where: { id: jobId },
        data: updates
    });
};

// Main OCR processing function
export const processDocumentWithJob = async (filePath, documentType, driveFileId = null) => {
    let job = null;

    try {
        // Create job
        job = await createOcrJob(driveFileId);

        await updateOcrJob(job.id, {
            status: 'PROCESSING',
            progress: 10
        });

        // Determine file type and process accordingly
        const ext = path.extname(filePath).toLowerCase();
        let ocrResult;

        if (ext === '.pdf') {
            ocrResult = await processPDF(filePath);
        } else if (['.xlsx', '.xls'].includes(ext)) {
            ocrResult = await processExcel(filePath);
        } else if (['.png', '.jpg', '.jpeg', '.tiff'].includes(ext)) {
            ocrResult = await processDocument(filePath, documentType);
        } else {
            throw new Error(`Unsupported file type: ${ext}`);
        }

        await updateOcrJob(job.id, {
            progress: 50
        });

        // Parse the extracted text based on document type
        let parsedData;
        if (documentType === 'PITCH_DECK') {
            const { parsePitchDeck } = await import('../parsers/pitchDeckParser.js');
            parsedData = parsePitchDeck(ocrResult.fullText);
        } else if (documentType === 'MIS') {
            const { parseMIS } = await import('../parsers/misParser.js');
            parsedData = parseMIS(ocrResult.fullText);
        } else if (documentType === 'FINANCIALS') {
            const { parseFinancials } = await import('../parsers/financialsParser.js');
            parsedData = parseFinancials(ocrResult.fullText);
        } else {
            parsedData = { rawText: ocrResult.fullText };
        }

        await updateOcrJob(job.id, {
            progress: 90
        });

        // Save to database if we have a drive file ID
        if (driveFileId) {
            await prisma.documentVersion.upsert({
                where: { driveFileId },
                update: {
                    processedAt: new Date(),
                    ocrStatus: 'COMPLETED',
                    extractedData: parsedData
                },
                create: {
                    documentType,
                    driveFileId,
                    fileName: path.basename(filePath),
                    fileSize: (await fs.stat(filePath)).size,
                    mimeType: getMimeType(ext),
                    ocrStatus: 'COMPLETED',
                    extractedData: parsedData
                }
            });
        }

        await updateOcrJob(job.id, {
            status: 'COMPLETED',
            progress: 100,
            result: parsedData,
            completedAt: new Date()
        });

        return {
            jobId: job.id,
            parsedData,
            rawText: ocrResult.fullText
        };
    } catch (error) {
        if (job) {
            await updateOcrJob(job.id, {
                status: 'FAILED',
                error: error.message,
                completedAt: new Date()
            });
        }
        throw error;
    }
};

// Helper function to get MIME type
function getMimeType(ext) {
    const mimeTypes = {
        '.pdf': 'application/pdf',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        '.xls': 'application/vnd.ms-excel'
    };
    return mimeTypes[ext] || 'application/octet-stream';
}

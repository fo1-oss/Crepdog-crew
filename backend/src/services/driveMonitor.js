import { google } from 'googleapis';
import prisma from '../config/database.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { processDocumentWithJob } from './ocrService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Google Drive API
const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/drive.readonly']
});

const drive = google.drive({ version: 'v3', auth });

// Folder IDs from environment
const FOLDERS = {
    PITCH_DECK: process.env.GOOGLE_DRIVE_PITCH_DECK_FOLDER_ID,
    MIS: process.env.GOOGLE_DRIVE_MIS_FOLDER_ID,
    FINANCIALS: process.env.GOOGLE_DRIVE_FINANCIALS_FOLDER_ID
};

// Track processed files
const processedFiles = new Set();

// Get files from a Google Drive folder
export const getFilesFromFolder = async (folderId) => {
    try {
        const response = await drive.files.list({
            q: `'${folderId}' in parents and trashed=false`,
            fields: 'files(id, name, mimeType, modifiedTime, size)',
            orderBy: 'modifiedTime desc'
        });

        return response.data.files || [];
    } catch (error) {
        console.error('Error fetching files from Drive:', error);
        return [];
    }
};

// Download file from Google Drive
export const downloadFile = async (fileId, fileName) => {
    try {
        const tempDir = path.join(__dirname, '../../temp');
        await fs.mkdir(tempDir, { recursive: true });

        const destPath = path.join(tempDir, fileName);
        const dest = await fs.open(destPath, 'w');

        const response = await drive.files.get(
            { fileId, alt: 'media' },
            { responseType: 'stream' }
        );

        return new Promise((resolve, reject) => {
            response.data
                .on('end', async () => {
                    await dest.close();
                    resolve(destPath);
                })
                .on('error', async (err) => {
                    await dest.close();
                    reject(err);
                })
                .pipe(dest.createWriteStream());
        });
    } catch (error) {
        console.error('Error downloading file:', error);
        throw error;
    }
};

// Check for new or updated files
export const checkForUpdates = async () => {
    console.log('🔍 Checking Google Drive for updates...');

    for (const [docType, folderId] of Object.entries(FOLDERS)) {
        if (!folderId) continue;

        try {
            const files = await getFilesFromFolder(folderId);

            for (const file of files) {
                // Check if file was already processed
                const existingDoc = await prisma.documentVersion.findUnique({
                    where: { driveFileId: file.id }
                });

                const fileModifiedTime = new Date(file.modifiedTime);

                // Process if new file or if file was updated
                if (!existingDoc || new Date(existingDoc.processedAt) < fileModifiedTime) {
                    console.log(`📄 New/updated file detected: ${file.name} (${docType})`);

                    // Download file
                    const localPath = await downloadFile(file.id, file.name);

                    // Process with OCR
                    try {
                        await processDocumentWithJob(localPath, docType, file.id);
                        console.log(`✅ Processed: ${file.name}`);

                        // Clean up temp file
                        await fs.unlink(localPath);
                    } catch (error) {
                        console.error(`❌ Failed to process ${file.name}:`, error);
                    }
                }
            }
        } catch (error) {
            console.error(`Error checking ${docType} folder:`, error);
        }
    }

    console.log('✅ Drive check complete');
};

// Start monitoring (called by cron job)
export const startMonitoring = (intervalMinutes = 15) => {
    console.log(`🚀 Starting Google Drive monitoring (every ${intervalMinutes} minutes)`);

    // Run immediately
    checkForUpdates();

    // Then run on interval
    setInterval(checkForUpdates, intervalMinutes * 60 * 1000);
};

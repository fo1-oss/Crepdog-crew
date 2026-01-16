import prisma from '../config/database.js';
import { parsePitchDeck } from '../parsers/pitchDeckParser.js';
import { parseMIS } from '../parsers/misParser.js';
import { parseFinancials } from '../parsers/financialsParser.js';

// Get all business data
export const getAllData = async (req, res) => {
    try {
        const data = await prisma.businessData.findMany({
            orderBy: { updatedAt: 'desc' }
        });

        // Transform to key-value object
        const dataObject = {};
        data.forEach(item => {
            dataObject[item.dataKey] = {
                value: item.dataValue,
                source: item.source,
                updatedAt: item.updatedAt
            };
        });

        res.json({
            success: true,
            data: dataObject
        });
    } catch (error) {
        console.error('Get all data error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get business data'
        });
    }
};

// Update business data manually
export const updateData = async (req, res) => {
    try {
        const { dataKey, dataValue, source = 'MANUAL' } = req.validatedBody;
        const updatedBy = req.user.id;

        const data = await prisma.businessData.upsert({
            where: { dataKey },
            update: {
                dataValue,
                source,
                updatedBy,
                updatedAt: new Date()
            },
            create: {
                dataKey,
                dataValue,
                source,
                updatedBy
            }
        });

        res.json({
            success: true,
            message: 'Data updated successfully',
            data
        });
    } catch (error) {
        console.error('Update data error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update data'
        });
    }
};

// Get data change history for a specific key
export const getDataHistory = async (req, res) => {
    try {
        const { key } = req.params;

        // This would require a separate history table
        // For now, just return the current value
        const data = await prisma.businessData.findUnique({
            where: { dataKey: key }
        });

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Data key not found'
            });
        }

        res.json({
            success: true,
            data
        });
    } catch (error) {
        console.error('Get data history error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get data history'
        });
    }
};

// Sync data from OCR results
export const syncFromOCR = async (ocrData, source = 'OCR') => {
    try {
        const updates = [];

        // Flatten OCR data and update database
        for (const [key, value] of Object.entries(ocrData)) {
            const dataKey = key;
            const dataValue = value;

            const update = prisma.businessData.upsert({
                where: { dataKey },
                update: {
                    dataValue,
                    source,
                    updatedBy: 'system',
                    updatedAt: new Date()
                },
                create: {
                    dataKey,
                    dataValue,
                    source,
                    updatedBy: 'system'
                }
            });

            updates.push(update);
        }

        await Promise.all(updates);
        console.log(`✅ Synced ${updates.length} data points from OCR`);

        return { success: true, count: updates.length };
    } catch (error) {
        console.error('Sync from OCR error:', error);
        throw error;
    }
};

// Trigger Google Sheets sync (placeholder)
export const syncFromSheets = async (req, res) => {
    try {
        // This would integrate with the existing Google Sheets service
        // For now, return success
        res.json({
            success: true,
            message: 'Google Sheets sync triggered'
        });
    } catch (error) {
        console.error('Sheets sync error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to sync from Google Sheets'
        });
    }
};

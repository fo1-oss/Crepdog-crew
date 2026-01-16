/**
 * Google Sheets Integration Service
 *
 * This service fetches data from a published Google Sheet and parses it
 * for use in the webapp data cards.
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Sheet with the template structure (see GOOGLE_SHEETS_TEMPLATE.md)
 * 2. Go to File > Share > Publish to web
 * 3. Select "Entire Document" and "Web page" format
 * 4. Click Publish and copy the sheet ID from the URL
 * 5. Set the SHEET_ID in the .env file or directly below
 */

// Replace with your Google Sheet ID
// The ID is found in the sheet URL: https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID || '';

// Sheet names/tabs
const SHEETS = {
  METRICS: 'Metrics',
  REVENUE: 'Revenue',
  STORES: 'Stores',
  TEAM: 'Team'
};

/**
 * Fetch data from a published Google Sheet
 * Uses the gviz JSON endpoint for published sheets
 */
async function fetchSheetData(sheetName) {
  if (!SHEET_ID) {
    console.warn('Google Sheet ID not configured. Using default data.');
    return null;
  }

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    // Google returns JSONP-like format, extract the JSON
    const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?$/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Google Sheets');
    }

    const data = JSON.parse(jsonMatch[1]);
    return parseSheetData(data);
  } catch (error) {
    console.error(`Error fetching sheet "${sheetName}":`, error);
    return null;
  }
}

/**
 * Parse Google Sheets response into key-value pairs
 * Expects format: Column A = Key, Column B = Value
 */
function parseSheetData(data) {
  const result = {};
  const rows = data.table?.rows || [];

  rows.forEach(row => {
    const cells = row.c || [];
    const key = cells[0]?.v;
    const value = cells[1]?.v;

    if (key) {
      result[key] = value;
    }
  });

  return result;
}

/**
 * Fetch all business data from Google Sheets
 */
export async function fetchAllData() {
  if (!SHEET_ID) {
    return null;
  }

  try {
    const [metrics, revenue, stores, team] = await Promise.all([
      fetchSheetData(SHEETS.METRICS),
      fetchSheetData(SHEETS.REVENUE),
      fetchSheetData(SHEETS.STORES),
      fetchSheetData(SHEETS.TEAM)
    ]);

    if (!metrics && !revenue && !stores && !team) {
      return null;
    }

    return transformToAppData({ metrics, revenue, stores, team });
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    return null;
  }
}

/**
 * Transform Google Sheets data to match app data structure
 */
function transformToAppData({ metrics, revenue, stores, team }) {
  const data = {};

  if (metrics) {
    data.companyInfo = {
      name: metrics.company_name || 'Crepdog Crew',
      founded: parseInt(metrics.founded) || 2020,
      totalEmployees: metrics.total_employees || '100+',
      totalCustomers: metrics.total_customers || '3,00,000+',
      storeCount: parseInt(metrics.store_count) || 5
    };

    data.revenueData = {
      arr: parseFloat(metrics.arr) || 188,
      ytdFY26: {
        revenue: parseFloat(metrics.ytd_revenue) || 94,
        grossMargin: parseFloat(metrics.gross_margin) || 53,
        cm2: parseFloat(metrics.cm2) || 9
      }
    };

    data.productData = {
      aov: {
        overall: parseInt(metrics.aov_overall) || 4200,
        online: parseInt(metrics.aov_online) || 3800,
        retail: parseInt(metrics.aov_retail) || 6000
      }
    };
  }

  if (revenue) {
    data.revenueHistory = {
      fy23: parseFloat(revenue.fy23_revenue) || 52,
      fy24: parseFloat(revenue.fy24_revenue) || 113,
      fy25: parseFloat(revenue.fy25_revenue) || 141,
      fy26: parseFloat(revenue.fy26_revenue) || 188,
      fy23Margin: parseFloat(revenue.fy23_margin) || 43,
      fy24Margin: parseFloat(revenue.fy24_margin) || 46,
      fy25Margin: parseFloat(revenue.fy25_margin) || 50,
      fy26Margin: parseFloat(revenue.fy26_margin) || 53
    };
  }

  if (stores) {
    // Parse store data if available
    data.storeUpdates = {
      monthlyBillings: stores.monthly_billings || '11,400 orders',
      revenuePerSqft: stores.revenue_per_sqft || '₹6,000',
      retentionRate: stores.retention_rate || '30%'
    };
  }

  if (team) {
    data.teamUpdates = {
      totalSize: team.total_size || '100+',
      techTeam: team.tech_team || '15',
      operationsTeam: team.operations_team || '50'
    };
  }

  return data;
}

/**
 * Check if Google Sheets integration is configured
 */
export function isGoogleSheetsConfigured() {
  return Boolean(SHEET_ID);
}

/**
 * Get the Google Sheet URL for editing
 */
export function getSheetEditUrl() {
  if (!SHEET_ID) return null;
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`;
}

export default {
  fetchAllData,
  isGoogleSheetsConfigured,
  getSheetEditUrl
};

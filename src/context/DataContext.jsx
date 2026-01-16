import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import * as initialData from '../data/businessData';
import { fetchAllData, isGoogleSheetsConfigured, getSheetEditUrl } from '../services/googleSheets';

const DataContext = createContext();

export function DataProvider({ children }) {
  // Initialize state from businessData.js
  const [companyInfo, setCompanyInfo] = useState(initialData.companyInfo);
  const [revenueData, setRevenueData] = useState(initialData.revenueData);
  const [channelData, setChannelData] = useState(initialData.channelData);
  const [storesData, setStoresData] = useState(initialData.storesData);
  const [productData, setProductData] = useState(initialData.productData);
  const [financials, setFinancials] = useState(initialData.financials);
  const [fundingData, setFundingData] = useState(initialData.fundingData);
  const [competitionData, setCompetitionData] = useState(initialData.competitionData);
  const [keyMetrics, setKeyMetrics] = useState(initialData.keyMetrics);

  // Google Sheets state
  const [isLoading, setIsLoading] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [syncError, setSyncError] = useState(null);

  // Fetch data from Google Sheets
  const refreshFromGoogleSheets = useCallback(async () => {
    if (!isGoogleSheetsConfigured()) {
      console.log('Google Sheets not configured, using default data');
      return false;
    }

    setIsLoading(true);
    setSyncError(null);

    try {
      const sheetsData = await fetchAllData();

      if (sheetsData) {
        // Update company info
        if (sheetsData.companyInfo) {
          setCompanyInfo(prev => ({ ...prev, ...sheetsData.companyInfo }));
        }

        // Update revenue data
        if (sheetsData.revenueData) {
          setRevenueData(prev => ({ ...prev, ...sheetsData.revenueData }));
        }

        // Update product data (AOV)
        if (sheetsData.productData) {
          setProductData(prev => ({ ...prev, ...sheetsData.productData }));
        }

        // Update store metrics
        if (sheetsData.storeUpdates) {
          setStoresData(prev => ({
            ...prev,
            metrics: { ...prev.metrics, ...sheetsData.storeUpdates }
          }));
        }

        setLastSyncTime(new Date());
        console.log('Data synced from Google Sheets:', sheetsData);
        return true;
      }
    } catch (error) {
      console.error('Error syncing from Google Sheets:', error);
      setSyncError(error.message);
    } finally {
      setIsLoading(false);
    }

    return false;
  }, []);

  // Auto-fetch on mount if configured
  useEffect(() => {
    if (isGoogleSheetsConfigured()) {
      refreshFromGoogleSheets();
    }
  }, [refreshFromGoogleSheets]);

  // Function to update data from OCR extraction
  const updateFromOCR = useCallback((extractedData) => {
    // Update ARR
    if (extractedData.arr) {
      setRevenueData(prev => ({ ...prev, arr: extractedData.arr }));
      setKeyMetrics(prev => ({
        ...prev,
        pills: prev.pills.map(pill =>
          pill.label === 'ARR^' ? { ...pill, value: `₹${extractedData.arr} Crore` } : pill
        )
      }));
    }

    // Update Gross Margin
    if (extractedData.grossMargin) {
      setRevenueData(prev => ({
        ...prev,
        ytdFY26: { ...prev.ytdFY26, grossMargin: extractedData.grossMargin }
      }));
      setKeyMetrics(prev => ({
        ...prev,
        pills: prev.pills.map(pill =>
          pill.label === 'Gross Margin*' ? { ...pill, value: `${extractedData.grossMargin}%` } : pill
        )
      }));
    }

    // Update CM2
    if (extractedData.cm2) {
      setKeyMetrics(prev => ({
        ...prev,
        pills: prev.pills.map(pill =>
          pill.label === 'CM2*' ? { ...pill, value: `${extractedData.cm2}%` } : pill
        )
      }));
    }

    // Update Team Size
    if (extractedData.teamSize) {
      setCompanyInfo(prev => ({ ...prev, totalEmployees: extractedData.teamSize }));
    }

    // Update Customers
    if (extractedData.customers) {
      setCompanyInfo(prev => ({ ...prev, totalCustomers: extractedData.customers }));
    }

    // Update Store Count
    if (extractedData.storeCount) {
      setCompanyInfo(prev => ({ ...prev, storeCount: extractedData.storeCount }));
    }

    // Update AOV
    if (extractedData.aov) {
      setProductData(prev => ({
        ...prev,
        aov: { ...prev.aov, overall: extractedData.aov }
      }));
    }

    // Update YTD GMV
    if (extractedData.ytdGmv) {
      setRevenueData(prev => ({
        ...prev,
        ytdFY26: { ...prev.ytdFY26, gmv: extractedData.ytdGmv }
      }));
    }

    // Update FY Revenue figures
    if (extractedData.fy26Target) {
      setRevenueData(prev => ({
        ...prev,
        annual: { ...prev.annual, FY26Target: extractedData.fy26Target }
      }));
      setKeyMetrics(prev => ({
        ...prev,
        pills: prev.pills.map(pill =>
          pill.label === 'FY26 Target' ? { ...pill, value: `₹${extractedData.fy26Target} Cr` } : pill
        )
      }));
    }

    if (extractedData.fy25) {
      setRevenueData(prev => ({
        ...prev,
        annual: { ...prev.annual, FY25: extractedData.fy25 }
      }));
    }

    if (extractedData.fy24) {
      setRevenueData(prev => ({
        ...prev,
        annual: { ...prev.annual, FY24: extractedData.fy24 }
      }));
      setFinancials(prev => ({
        ...prev,
        FY24: { ...prev.FY24, revenue: extractedData.fy24 }
      }));
    }

    if (extractedData.fy23) {
      setRevenueData(prev => ({
        ...prev,
        annual: { ...prev.annual, FY23: extractedData.fy23 }
      }));
      setFinancials(prev => ({
        ...prev,
        FY23: { ...prev.FY23, revenue: extractedData.fy23 }
      }));
    }

    // Update Channel Split
    if (extractedData.retailSplit) {
      setChannelData(prev => ({
        ...prev,
        split: { ...prev.split, retail: extractedData.retailSplit }
      }));
    }

    if (extractedData.onlineSplit) {
      setChannelData(prev => ({
        ...prev,
        split: { ...prev.split, online: extractedData.onlineSplit }
      }));
    }

    // Update Competition Data
    if (extractedData.fulfillment) {
      setCompetitionData(prev => ({
        ...prev,
        cdc: { ...prev.cdc, fulfillment: extractedData.fulfillment }
      }));
    }

    if (extractedData.authenticity) {
      setCompetitionData(prev => ({
        ...prev,
        cdc: { ...prev.cdc, authenticity: extractedData.authenticity }
      }));
    }

    // Update Net Worth
    if (extractedData.netWorth) {
      setFinancials(prev => ({
        ...prev,
        FY24: { ...prev.FY24, netWorth: extractedData.netWorth }
      }));
    }

    // Update Funding Amount
    if (extractedData.fundingAmount) {
      setFundingData(prev => ({
        ...prev,
        currentRound: { ...prev.currentRound, amount: extractedData.fundingAmount }
      }));
    }

    console.log('Data updated from OCR:', extractedData);
  }, []);

  const value = {
    companyInfo,
    revenueData,
    channelData,
    storesData,
    productData,
    financials,
    fundingData,
    competitionData,
    keyMetrics,
    documentLinks: initialData.documentLinks,
    founders: initialData.founders,
    expansionData: initialData.expansionData,
    marketData: initialData.marketData,
    unitEconomics: initialData.unitEconomics,
    marketProblems: initialData.marketProblems,
    updateFromOCR,
    // Google Sheets integration
    isLoading,
    lastSyncTime,
    syncError,
    refreshFromGoogleSheets,
    isGoogleSheetsConfigured: isGoogleSheetsConfigured(),
    googleSheetUrl: getSheetEditUrl()
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

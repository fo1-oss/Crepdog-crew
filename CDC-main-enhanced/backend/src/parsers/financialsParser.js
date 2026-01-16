// Parser for Financial Statements (P&L, Balance Sheet)
// Extracts financial metrics and ratios

export const parseFinancials = (text) => {
    const metrics = {};

    // P&L Items
    const revenueMatch = text.match(/(?:Total\s*)?Revenue[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore|L|Lakh)/i);
    const cogsMatch = text.match(/(?:COGS|Cost\s*of\s*Goods)[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore|L|Lakh)/i);
    const opexMatch = text.match(/(?:Operating\s*Costs?|OPEX)[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore|L|Lakh)/i);
    const netProfitMatch = text.match(/(?:Net\s*Profit|PAT)[:\s]*[₹Rs.]*\s*(-?[\d,.]+)\s*(Cr|Crore|L|Lakh)/i);

    if (revenueMatch) {
        const value = parseFloat(revenueMatch[1].replace(/,/g, ''));
        metrics.revenue = revenueMatch[2].toLowerCase().startsWith('l') ? value / 100 : value;
    }
    if (cogsMatch) {
        const value = parseFloat(cogsMatch[1].replace(/,/g, ''));
        metrics.cogs = cogsMatch[2].toLowerCase().startsWith('l') ? value / 100 : value;
    }
    if (opexMatch) {
        const value = parseFloat(opexMatch[1].replace(/,/g, ''));
        metrics.opex = opexMatch[2].toLowerCase().startsWith('l') ? value / 100 : value;
    }
    if (netProfitMatch) {
        const value = parseFloat(netProfitMatch[1].replace(/,/g, ''));
        metrics.netProfit = netProfitMatch[2].toLowerCase().startsWith('l') ? value / 100 : value;
    }

    // Balance Sheet Items
    const assetsMatch = text.match(/(?:Total\s*)?Assets[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore|L|Lakh)/i);
    const liabilitiesMatch = text.match(/(?:Total\s*)?Liabilities[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore|L|Lakh)/i);
    const netWorthMatch = text.match(/Net\s*Worth[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore|L|Lakh)/i);
    const cashMatch = text.match(/Cash[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore|L|Lakh)/i);
    const inventoryMatch = text.match(/Inventory[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore|L|Lakh)/i);

    if (assetsMatch) {
        const value = parseFloat(assetsMatch[1].replace(/,/g, ''));
        metrics.totalAssets = assetsMatch[2].toLowerCase().startsWith('l') ? value / 100 : value;
    }
    if (liabilitiesMatch) {
        const value = parseFloat(liabilitiesMatch[1].replace(/,/g, ''));
        metrics.totalLiabilities = liabilitiesMatch[2].toLowerCase().startsWith('l') ? value / 100 : value;
    }
    if (netWorthMatch) {
        const value = parseFloat(netWorthMatch[1].replace(/,/g, ''));
        metrics.netWorth = netWorthMatch[2].toLowerCase().startsWith('l') ? value / 100 : value;
    }
    if (cashMatch) {
        const value = parseFloat(cashMatch[1].replace(/,/g, ''));
        metrics.cash = cashMatch[2].toLowerCase().startsWith('l') ? value / 100 : value;
    }
    if (inventoryMatch) {
        const value = parseFloat(inventoryMatch[1].replace(/,/g, ''));
        metrics.inventory = inventoryMatch[2].toLowerCase().startsWith('l') ? value / 100 : value;
    }

    // Financial Ratios
    const currentRatioMatch = text.match(/Current\s*Ratio[:\s]*([\d.]+)/i);
    const debtEquityMatch = text.match(/Debt[:\s]*(?:to[:\s]*)?Equity[:\s]*([\d.]+)/i);
    const roceMatch = text.match(/ROCE[:\s]*([\d.]+)\s*%/i);
    const npmMatch = text.match(/(?:Net\s*Profit\s*Margin|NPM)[:\s]*(-?[\d.]+)\s*%/i);

    if (currentRatioMatch) metrics.currentRatio = parseFloat(currentRatioMatch[1]);
    if (debtEquityMatch) metrics.debtToEquity = parseFloat(debtEquityMatch[1]);
    if (roceMatch) metrics.roce = parseFloat(roceMatch[1]);
    if (npmMatch) metrics.netProfitMargin = parseFloat(npmMatch[1]);

    // EBITDA
    const ebitdaMatch = text.match(/EBITDA[:\s]*[₹Rs.]*\s*(-?[\d,.]+)\s*(Cr|Crore|L|Lakh|%)?/i);
    if (ebitdaMatch) {
        const value = parseFloat(ebitdaMatch[1].replace(/,/g, ''));
        if (ebitdaMatch[2] && ebitdaMatch[2] === '%') {
            metrics.ebitdaMargin = value;
        } else {
            metrics.ebitda = ebitdaMatch[2]?.toLowerCase().startsWith('l') ? value / 100 : value;
        }
    }

    console.log(`📊 Parsed ${Object.keys(metrics).length} financial metrics`);
    return metrics;
};

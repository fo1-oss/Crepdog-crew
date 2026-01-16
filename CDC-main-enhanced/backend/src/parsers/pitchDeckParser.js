// Parser for Pitch Deck documents
// Extracts key business metrics from pitch deck text

export const parsePitchDeck = (text) => {
    const metrics = {};

    // ARR (Annual Recurring Revenue)
    const arrMatch = text.match(/ARR[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore)/i);
    if (arrMatch) {
        metrics.arr = parseFloat(arrMatch[1].replace(/,/g, ''));
    }

    // Revenue figures
    const revenuePatterns = [
        { key: 'fy26Target', pattern: /FY['"\s]?26[:\s]*(?:Target)?[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore)/i },
        { key: 'fy25', pattern: /FY['"\s]?25[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore)/i },
        { key: 'fy24', pattern: /FY['"\s]?24[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore)/i },
        { key: 'fy23', pattern: /FY['"\s]?23[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore)/i },
    ];

    revenuePatterns.forEach(({ key, pattern }) => {
        const match = text.match(pattern);
        if (match) {
            metrics[key] = parseFloat(match[1].replace(/,/g, ''));
        }
    });

    // YTD GMV
    const ytdMatch = text.match(/(?:YTD|GMV)[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore)/i);
    if (ytdMatch) {
        metrics.ytdGmv = parseFloat(ytdMatch[1].replace(/,/g, ''));
    }

    // Gross Margin
    const gmMatch = text.match(/Gross\s*Margin[:\s]*([\d.]+)\s*%/i);
    if (gmMatch) {
        metrics.grossMargin = parseFloat(gmMatch[1]);
    }

    // Store count
    const storeMatch = text.match(/([\d]+)\s*(?:Stores|stores|Store)/i);
    if (storeMatch) {
        metrics.storeCount = parseInt(storeMatch[1]);
    }

    // Team size
    const teamMatch = text.match(/(?:Team|Employees|Crew)[:\s]*([\d,]+)\+?/i);
    if (teamMatch) {
        metrics.teamSize = teamMatch[1].replace(/,/g, '') + '+';
    }

    // Customers
    const customerMatch = text.match(/(?:Customers|Crew\s*Members)[:\s]*([\d,]+)\+?/i);
    if (customerMatch) {
        metrics.customers = customerMatch[1].replace(/,/g, '') + '+';
    }

    // AOV (Average Order Value)
    const aovMatch = text.match(/(?:AOV|Average\s*Order\s*Value|ABV)[:\s]*[₹Rs.]*\s*([\d,]+)/i);
    if (aovMatch) {
        metrics.aov = parseInt(aovMatch[1].replace(/,/g, ''));
    }

    // Fulfillment rate
    const fulfillMatch = text.match(/(?:Fulfillment|Delivery)[:\s]*([\d.]+)\s*%/i);
    if (fulfillMatch) {
        metrics.fulfillment = parseFloat(fulfillMatch[1]);
    }

    // Funding amount
    const fundingMatch = text.match(/(?:Raising|Pre-Series\s*A|Funding)[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore)/i);
    if (fundingMatch) {
        metrics.fundingAmount = parseFloat(fundingMatch[1].replace(/,/g, ''));
    }

    // Channel split
    const retailMatch = text.match(/Retail[:\s]*([\d.]+)\s*%/i);
    const onlineMatch = text.match(/Online[:\s]*([\d.]+)\s*%/i);
    if (retailMatch) metrics.retailSplit = parseFloat(retailMatch[1]);
    if (onlineMatch) metrics.onlineSplit = parseFloat(onlineMatch[1]);

    console.log(`📊 Parsed ${Object.keys(metrics).length} metrics from pitch deck`);
    return metrics;
};

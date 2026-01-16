// Parser for MIS (Management Information System) documents
// Extracts operational and channel metrics

export const parseMIS = (text) => {
    const metrics = {};

    // Quarterly revenue data
    const quarterlyPattern = /Q[1-4][:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore|L|Lakh)/gi;
    const quarterlyMatches = [...text.matchAll(quarterlyPattern)];

    if (quarterlyMatches.length > 0) {
        metrics.quarterlyRevenue = quarterlyMatches.map(match => {
            const value = parseFloat(match[1].replace(/,/g, ''));
            const unit = match[2].toLowerCase();
            return unit.startsWith('l') ? value / 100 : value; // Convert Lakh to Cr
        });
    }

    // Channel split (Online vs Retail)
    const onlineRevenueMatch = text.match(/Online[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore)/i);
    const retailRevenueMatch = text.match(/Retail[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore)/i);

    if (onlineRevenueMatch) {
        metrics.onlineRevenue = parseFloat(onlineRevenueMatch[1].replace(/,/g, ''));
    }
    if (retailRevenueMatch) {
        metrics.retailRevenue = parseFloat(retailRevenueMatch[1].replace(/,/g, ''));
    }

    // Channel margins
    const onlineMarginMatch = text.match(/Online[^%]*Margin[:\s]*([\d.]+)\s*%/i);
    const retailMarginMatch = text.match(/Retail[^%]*Margin[:\s]*([\d.]+)\s*%/i);

    if (onlineMarginMatch) {
        metrics.onlineMargin = parseFloat(onlineMarginMatch[1]);
    }
    if (retailMarginMatch) {
        metrics.retailMargin = parseFloat(retailMarginMatch[1]);
    }

    // Store-wise revenue
    const storeRevenue = {};
    const storePattern = /(Delhi|Mumbai|Hyderabad|Bangalore)[:\s]*[₹Rs.]*\s*([\d,.]+)\s*(Cr|Crore)/gi;
    const storeMatches = [...text.matchAll(storePattern)];

    storeMatches.forEach(match => {
        const city = match[1];
        const value = parseFloat(match[2].replace(/,/g, ''));
        storeRevenue[city.toLowerCase()] = value;
    });

    if (Object.keys(storeRevenue).length > 0) {
        metrics.storeRevenue = storeRevenue;
    }

    // Product mix
    const shoesMatch = text.match(/(?:Shoes|Sneakers)[:\s]*([\d.]+)\s*%/i);
    const apparelMatch = text.match(/(?:Apparel|Clothing)[:\s]*([\d.]+)\s*%/i);

    if (shoesMatch) metrics.shoesPct = parseFloat(shoesMatch[1]);
    if (apparelMatch) metrics.apparelPct = parseFloat(apparelMatch[1]);

    // Monthly metrics
    const monthlyFootfallMatch = text.match(/(?:Footfall|Visitors)[:\s]*([\d,]+)/i);
    const conversionMatch = text.match(/Conversion[:\s]*([\d.]+)\s*%/i);

    if (monthlyFootfallMatch) {
        metrics.monthlyFootfall = parseInt(monthlyFootfallMatch[1].replace(/,/g, ''));
    }
    if (conversionMatch) {
        metrics.conversionRate = parseFloat(conversionMatch[1]);
    }

    console.log(`📊 Parsed ${Object.keys(metrics).length} metrics from MIS`);
    return metrics;
};

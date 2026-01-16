// Centralized Business Data - Single Source of Truth
// All data from CDC Investor Data Room (Jan 2026)
// Source: Google Drive Data Room - https://drive.google.com/drive/folders/1etUhqNoF24SfEO9U9irET1KgjC2o4nMa

export const companyInfo = {
  name: "Crepdog Crew",
  shortName: "CDC",
  tagline: "India's #1 Premium Sneaker Destination",
  founded: 2019,
  incorporatedDate: "Sept 2022",
  website: "crepdogcrew.com",
  totalEmployees: "100+",
  totalCustomers: "250,000+",
  totalStoreArea: "12,500 sqft",
  storeCount: 3
};

export const founders = [
  {
    name: "Anchit Kapil",
    initials: "AK",
    role: "CEO",
    education: "Lancaster University",
    experience: "Summer House Cafe",
    focus: "Strategy & Vision",
    variant: "default"
  },
  {
    name: "Shaurya Kumar",
    initials: "SK",
    role: "COO",
    education: "LSE Graduate",
    experience: "Operations Expert",
    focus: "Operations & Scale",
    variant: "dark"
  },
  {
    name: "Bharat Mehrotra",
    initials: "BM",
    role: "CBO",
    education: "Lancaster + Warwick",
    experience: "Finance Background",
    focus: "Business & Finance",
    variant: "darker"
  }
];

// Revenue & Financial Data
export const revenueData = {
  // Quarterly Revenue (₹ Cr)
  quarterly: {
    labels: ["FY'25 Q1", "FY'25 Q2", "FY'25 Q3", "FY'25 Q4", "FY'26 Q1", "FY'26 Q2", "FY'26 Q3"],
    values: [17.1, 17.4, 23.6, 21.7, 27.1, 28.4, 37.8]
  },
  // Annual Revenue (₹ Cr)
  annual: {
    FY23: 12.46,
    FY24: 65.5,
    FY25: 80,
    FY26Target: 120
  },
  // YTD FY26 (Apr-Dec 2025)
  ytdFY26: {
    gmv: 93.3,
    operatingRevenue: 88.5,
    grossMargin: 18
  },
  arr: 188 // Annualized Run Rate
};

// Channel Data
export const channelData = {
  split: {
    retail: 59,
    online: 41
  },
  revenue: {
    retail: 55, // ₹ Cr YTD
    online: 38  // ₹ Cr YTD
  },
  margin: {
    retail: 24,
    online: 21,
    blended: 22
  },
  ebitda: {
    retail: 9,
    online: 3
  },
  // Channel trend by quarter (₹ Cr)
  trend: {
    labels: ["FY'25 Q1", "Q2", "Q3", "Q4", "FY'26 Q1", "Q2", "Q3"],
    online: [9.31, 8.32, 11.78, 11.08, 12.76, 14.0, 21.0],
    retail: [7.79, 9.08, 11.82, 10.62, 14.34, 14.4, 16.8]
  },
  // Product mix by channel
  productMix: {
    online: { shoes: 92, apparel: 8 },
    retail: { shoes: 75, apparel: 25 }
  }
};

// Store Data
export const storesData = {
  stores: [
    {
      name: "Delhi",
      city: "Delhi NCR",
      area: 4000,
      openDate: "Feb 2022",
      type: "Flagship",
      revenueYTD: 27,
      revenueQ3: 6.52,
      apparelPct: "28%",
      shoesPct: "72%",
      variant: "default"
    },
    {
      name: "Mumbai",
      city: "Mumbai",
      area: 2500,
      openDate: "May 2023",
      type: "Premium Location",
      revenueYTD: 16,
      revenueQ3: 5.40,
      apparelPct: "32%",
      shoesPct: "68%",
      variant: "dark"
    },
    {
      name: "Hyderabad",
      city: "Hyderabad",
      area: 3700,
      openDate: "Oct 2024",
      type: "Newest Store",
      revenueYTD: 12,
      revenueQ3: 4.61,
      apparelPct: "25%",
      shoesPct: "75%",
      variant: "darker"
    }
  ],
  // Quarterly revenue by store (₹ Cr)
  quarterlyRevenue: {
    labels: ["FY'25 Q1", "FY'25 Q2", "FY'25 Q3", "FY'25 Q4", "FY'26 Q1", "FY'26 Q2", "FY'26 Q3"],
    delhi: [5.65, 4.51, 4.67, 3.92, 5.91, 5.34, 6.52],
    mumbai: [2.08, 4.56, 4.22, 2.84, 4.61, 4.66, 5.40],
    hyderabad: [0, 0, 0, 2.94, 3.82, 3.80, 4.61]
  },
  economics: {
    investmentPerStore: "₹3-7.5 Cr",
    paybackPeriod: "12-24 months",
    targetROI: "100%",
    teamPerStore: 10,
    monthlyFootfall: 9000,
    conversionRate: 35
  }
};

// Product Data
export const productData = {
  mix: {
    sneakers: 70,
    streetwear: 25,
    accessories: 5
  },
  margins: {
    sneakers: { min: 18, max: 20, avg: 18 },
    streetwear: { min: 35, max: 40, avg: 37 },
    accessories: { min: 18, max: 50, avg: 30 }
  },
  aov: {
    overall: 12500,
    retail: 15000,
    online: 10500
  }
};

// Financial Statements
export const financials = {
  FY24: {
    revenue: 65.5,
    costOfGoods: 54,
    operatingCosts: 11.5,
    netProfitLoss: -0.77, // -₹77 Lakh
    assets: {
      total: 1.57,
      equipment: 0.16,
      inventory: 0.49,
      cash: 0.67,
      receivables: 0.038
    },
    liabilities: {
      total: 0.515,
      founderLoans: 0.033,
      supplierPayables: 0.34,
      otherPayables: 0.14
    },
    netWorth: 1.05,
    ratios: {
      currentRatio: 2.69,
      debtToEquity: 0.49,
      inventoryTurnover: 26.53,
      netCapitalTurnover: 16.03,
      roce: 5,
      netProfitMargin: -1
    },
    lossReason: "Mumbai store fire in May 2024, disrupting 2 months of operations"
  },
  FY23: {
    revenue: 12.46,
    netProfit: 0.185, // ₹18.5 Lakh
    stores: 1,
    cashInBank: 2.63,
    netWorth: 0.438
  }
};

// Funding Data
export const fundingData = {
  currentRound: {
    type: "Pre-Series A",
    amount: 40, // ₹ Cr
    allocation: [
      { name: "Store Expansion", amount: 21, percentage: 53 },
      { name: "Store Opex", amount: 8, percentage: 20 },
      { name: "Inventory", amount: 6, percentage: 15 },
      { name: "Marketing", amount: 3.5, percentage: 9 },
      { name: "Team", amount: 1.5, percentage: 3 }
    ]
  },
  previousRounds: {
    seed: 4,
    angel: 9.5,
    total: 13.5
  },
  nextRound: {
    type: "Series A",
    amount: 160
  }
};

// Expansion Roadmap
export const expansionData = {
  roadmap: [
    { year: "FY26", stores: 3, milestone: "Current Operations" },
    { year: "FY27", stores: 10, milestone: "Metro Expansion" },
    { year: "FY30", stores: 20, milestone: "Pan-India Presence" }
  ],
  targetCities: ["Bangalore", "Pune", "Kolkata", "Chandigarh", "Ahmedabad"],
  sqftByCity: {
    labels: ["Delhi NCR", "Mumbai", "Hyderabad", "Bangalore", "Ahmedabad", "Chandigarh"],
    "2025": [4000, 2500, 3700, 0, 0, 0],
    "2027": [6500, 7500, 3700, 15000, 0, 0],
    "2030": [30000, 30000, 3700, 30000, 3000, 3000]
  }
};

// Market Data
export const marketData = {
  tam: {
    current: 15150, // ₹ Cr (2025)
    projected: 35000, // ₹ Cr (2030)
    cagr: 6.5
  },
  cdcShare: {
    current: 0.83,
    target: 3,
    targetRevenue: 1000 // ₹ Cr by 2030
  },
  targetCustomer: {
    gender: "Male",
    ageRange: "14-35 years",
    income: "₹10-50 LPA",
    description: "Urban sneakerheads & streetwear enthusiasts"
  }
};

// Competition Data
export const competitionData = {
  cdc: {
    name: "Crepdog Crew",
    revenue: 120,
    authenticity: 99,
    fulfillment: 98,
    stores: 3,
    model: "SOR + Retail"
  },
  competitors: [
    { name: "Culture", revenue: 50, authenticity: "60-80%", fulfillment: "10-60%", stores: 1 },
    { name: "Dawntown", revenue: 40, authenticity: "60-80%", fulfillment: "10-60%", stores: 0 },
    { name: "MainStreet", revenue: 25, authenticity: "60-80%", fulfillment: "10-60%", stores: 1 }
  ]
};

// Key Metrics for Overview
export const keyMetrics = {
  pills: [
    { label: "FY26 Target", value: "₹120 Cr" },
    { label: "Stores", value: "3" },
    { label: "Crew Members", value: "250K+" },
    { label: "Fulfillment", value: "98%" }
  ],
  stats: [
    { icon: "fa-chart-line", label: "YTD Revenue", value: "₹93.3 Cr", sublabel: "Apr-Dec 2025" },
    { icon: "fa-store", label: "Total Retail Area", value: "12,500 sqft", sublabel: "3 Stores" },
    { icon: "fa-percent", label: "Gross Margin", value: "22%", sublabel: "Blended" },
    { icon: "fa-shopping-bag", label: "Avg Order Value", value: "₹12,500", sublabel: "All Channels" }
  ]
};

// Document Links
export const documentLinks = {
  pitchDeck: "https://drive.google.com/drive/folders/16dEnuE4Aml9asy6tmn3a8AqtRUn08PTE",
  mis: "https://drive.google.com/drive/folders/1hJVr0xzckP_iSMZekXmkAGm_IaGmyHNU",
  financials: "https://drive.google.com/drive/folders/138WYK9a_5kOLRkVCSllR8fD-peJ8JvrG",
  investorFaq: "https://drive.google.com/drive/folders/1etUhqNoF24SfEO9U9irET1KgjC2o4nMa",
  dataRoom: "https://drive.google.com/drive/folders/1etUhqNoF24SfEO9U9irET1KgjC2o4nMa"
};

// Unit Economics
export const unitEconomics = {
  retail: [
    { label: "Revenue", value: 100, color: "#C0E529" },
    { label: "COGS", value: 76, color: "#9BBF1E" },
    { label: "Gross Margin", value: 24, color: "#6B8E23" },
    { label: "Store Opex", value: 15, color: "#4A5D23" },
    { label: "EBITDA", value: 9, color: "#3D4A2B" }
  ],
  online: [
    { label: "Revenue", value: 100, color: "#C0E529" },
    { label: "COGS", value: 79, color: "#9BBF1E" },
    { label: "Gross Margin", value: 21, color: "#6B8E23" },
    { label: "Fulfillment", value: 8, color: "#4A5D23" },
    { label: "Marketing", value: 10, color: "#5A7D33" },
    { label: "EBITDA", value: 3, color: "#3D4A2B" }
  ]
};

// Problem statements for Market page
export const marketProblems = [
  {
    icon: "fa-times-circle",
    stat: "60%",
    text: "<strong>Fake Products Everywhere:</strong> 6 out of 10 premium sneakers sold online are counterfeit. No trusted platform exists.",
    activeCount: 6
  },
  {
    icon: "fa-clock",
    stat: "45 Days",
    text: "<strong>Endless Wait Times:</strong> Average delivery from resellers takes 45+ days. Customers want products NOW.",
    activeCount: 4
  },
  {
    icon: "fa-dollar-sign",
    stat: "40%",
    text: "<strong>Hidden Markups:</strong> Resellers add 40%+ margins with zero transparency. Customers overpay significantly.",
    activeCount: 4
  }
];

export const knowledgeBase = {
  // Company Overview
  overview: "Crepdog Crew (CDC) is India's premier destination for premium luxury lifestyle products, specializing in authenticated sneakers, streetwear, and accessories. Founded in 2019 as Instagram page, incorporated as Pvt Ltd in Sept 2022. We operate 3 stores (12,500 sqft) across Delhi, Mumbai & Hyderabad with 250,000+ active crew members.",
  mission: "Our mission: To be India's largest premium luxury lifestyle destination, providing transparent, curated, authenticated products to urban India. Key drivers: 100% authentication, no hidden markups, single platform for global & homegrown brands.",
  founders: "Three co-founders: Anchit Kapil (CEO, Lancaster + Summer House Cafe background), Shaurya Kumar (COO, LSE graduate), Bharat Mehrotra (CBO, Lancaster + Warwick). Combined 15+ years in retail, hospitality & finance.",

  // Business Model
  businessModel: "Dual-channel model: Retail (51% of revenue) + Online D2C (49%). We source from 50+ homegrown brands and vendor partners. Take rate: 18% for shoes, 37% for apparel = 22% blended gross margin. SOR (Sell or Return) model ensures zero inventory risk.",
  sor: "SOR (Sell Or Return) is our capital-efficient inventory model. Benefits: Zero upfront investment, no dead stock risk, exclusive access to premium drops, rapid scalability. Partners include FILA, CASIO for exclusive releases.",

  // Revenue & Financials
  revenue: "YTD FY'26 GMV: ₹93.3 Cr, Operating Revenue: ₹88.5 Cr. FY'25: ₹80 Cr, FY'24: ₹65 Cr, FY'23: ₹12.5 Cr. Targeting ₹120 Cr for FY'26. ARR (Annualized Run Rate): ₹188 Crore.",
  margin: "Gross Margin: 22% blended (Sneakers 18-20%, Streetwear 35-40%, Accessories 18-50%). Retail: 24% margin, Online: 21%. CM2: 9% company level. Retail EBITDA: 9%, Online: 3%.",
  profitability: "FY24 showed loss due to Mumbai store fire (May 2024) disrupting 2 months of operations. Improvement driven by operating leverage, retail expansion (higher EBITDA), and product mix optimization.",
  ratios: "Key Ratios FY24: Current Ratio 2.69, Debt-Equity 0.49, Inventory Turnover 26.53x, Net Capital Turnover 16.03, ROCE 5%. Healthy working capital cycle with 65-80 day inventory turns.",

  // Stores
  stores: "3 stores: Delhi (4,000 sqft, Feb 2022, flagship), Mumbai (2,500 sqft, May 2023), Hyderabad (3,700 sqft, Oct 2024). Total: 12,500 sqft. Monthly footfall: 9,000+, Conversion: 35%.",
  storeEconomics: "Store Economics: Investment ₹3-7.5 Cr per flagship, Payback 12-24 months, Target ROI 100% annually. Per store team: 1 SM, 1 AM, 6-7 Floor Captains, 1 Cashier (~10 employees).",
  expansion: "Expansion Roadmap: FY27 target 10 stores, FY30 target 20+ stores. Next cities: Bangalore, Pune, Kolkata, Chandigarh. Focus on Tier 1 & premium Tier 2 cities.",

  // Products
  products: "Product Mix: Sneakers 70%, Streetwear 25%, Accessories 5%. Future expansion to premium watches, bags, lifestyle products. Category expansion expected to add 20-30% revenue uplift.",
  aov: "AOV (Average Order Value): ₹12,500 overall. Retail: ₹15,000 (premium experience), Online: ₹10,500 (competitive pricing). Retail AOV higher due to browsing effect and convenience markup.",

  // Market
  market: "Indian premium lifestyle market: ₹15,150 Cr (2025) → ₹35,000 Cr by 2030 at 6.5% CAGR. CDC current share: 0.83%. Target: 3% market share = ₹1,000 Cr revenue by 2030.",
  customer: "Target Customer: Urban males 14-35 years, income ₹10-50 LPA, sneakerheads & streetwear enthusiasts. Tech-savvy, active on Instagram/TikTok. Values: authenticity, exclusivity, community.",

  // Competition
  competition: "CDC leads with ₹120 Cr revenue, 98% fulfillment, 99% authenticity. Competitors: Culture (₹50 Cr), Dawntown (₹40 Cr), MainStreet (₹25 Cr). Key differentiators: authentication, fulfillment, SOR model.",
  differentiators: "CDC Differentiators: 99% authenticity vs 60-80% competitors, 98% fulfillment vs 10-60%, Capital-efficient SOR model, 250K+ customers, industry-leading take rates, omnichannel presence.",

  // Funding
  funding: "Raising ₹40 Cr Pre-Series A. Allocation: Store Expansion ₹21 Cr (53%), Store Opex ₹8 Cr (20%), Inventory ₹6 Cr (15%), Marketing ₹3.5 Cr (9%), Team ₹1.5 Cr (3%). Series A planned: ₹160 Cr.",
  previousRounds: "Previous funding: ₹4 Cr Seed + ₹9.5 Cr Angel rounds. Total raised: ₹13.5 Cr. Current investors include strategic angels in retail and fashion.",

  // Online Strategy
  online: "Online Strategy: Current ROAS 11X at ₹35L/month spend. Target: Scale to 3-4X ROAS with higher volume. Channels: Instagram, Meta, WhatsApp. CAC: ₹1,000. Focus on experiential marketing via Zomaland, concerts.",

  // Risk & Resilience
  risk: "Market Risk Mitigation: 'Essential luxury' segment resilient in downturns. Diversified product mix beyond high-ticket items. SOR model transfers inventory risk to brand partners. Focus on trend-driven products.",

  // Team
  team: "100+ employees across retail and operations. Leadership: Anchit Kapil (CEO), Shaurya Kumar (COO), Bharat Mehrotra (CBO). Advisory from retail and fashion industry veterans."
};

export function findAnswer(query) {
  const q = query.toLowerCase();

  // Company Overview
  if (q.match(/what is cdc|about cdc|company|crepdog/)) return knowledgeBase.overview;
  if (q.match(/mission|vision|goal/)) return knowledgeBase.mission;
  if (q.match(/founder|who started|leadership|anchit|shaurya|bharat/)) return knowledgeBase.founders;

  // Business Model
  if (q.match(/business model|how.*work|model/)) return knowledgeBase.businessModel;
  if (q.match(/sor|sell or return|consignment|inventory model/)) return knowledgeBase.sor;

  // Financials
  if (q.match(/revenue|sales|gmv|arr|turnover/)) return knowledgeBase.revenue;
  if (q.match(/margin|cm2|gross|ebitda/)) return knowledgeBase.margin;
  if (q.match(/profit|loss|why loss|fy24 loss/)) return knowledgeBase.profitability;
  if (q.match(/ratio|current ratio|debt|roce|financial ratio/)) return knowledgeBase.ratios;

  // Stores
  if (q.match(/store|retail|delhi|mumbai|hyderabad|location/)) return knowledgeBase.stores;
  if (q.match(/store economic|payback|roi|store cost/)) return knowledgeBase.storeEconomics;
  if (q.match(/expansion|new store|roadmap|growth plan/)) return knowledgeBase.expansion;

  // Products
  if (q.match(/product|category|sneaker|streetwear|shoe|apparel/)) return knowledgeBase.products;
  if (q.match(/aov|order value|ticket size|average/)) return knowledgeBase.aov;

  // Market
  if (q.match(/market|opportunity|tam|sam|som|cagr|size/)) return knowledgeBase.market;
  if (q.match(/customer|target|demographic|audience|who buy/)) return knowledgeBase.customer;

  // Competition
  if (q.match(/compet|vs|culture|dawntown|mainstreet|compare/)) return knowledgeBase.competition;
  if (q.match(/differ|why cdc|usp|unique|advantage|authentic/)) return knowledgeBase.differentiators;

  // Funding
  if (q.match(/fund|raise|invest|capital|series|alloc|use of/)) return knowledgeBase.funding;
  if (q.match(/previous.*fund|seed|angel|raised so far/)) return knowledgeBase.previousRounds;

  // Online
  if (q.match(/online|digital|ecommerce|roas|cac|marketing/)) return knowledgeBase.online;

  // Risk
  if (q.match(/risk|downturn|crash|resilience|what if/)) return knowledgeBase.risk;

  // Team
  if (q.match(/team|employee|people|staff/)) return knowledgeBase.team;

  return "I can help with: company overview, business model, SOR strategy, revenue & financials, stores, products, market opportunity, competition, funding, online strategy, risk factors, or team. What would you like to know?";
}

import PageHeader from '../components/PageHeader';
import {
  companyInfo,
  revenueData,
  channelData,
  storesData,
  productData,
  financials,
  competitionData,
  documentLinks
} from '../data/businessData';

function Documents() {
  return (
    <section className="section active">
      <PageHeader
        title="Data Room"
        highlight="Documents"
      />

      {/* PITCH DECK INFOGRAPHIC */}
      <div className="infographic-card" style={{ marginBottom: '32px' }}>
        <div className="infographic-header lime">
          <div className="infographic-icon"><i className="fas fa-file-powerpoint"></i></div>
          <div className="infographic-title-wrap">
            <h3 className="infographic-title">Investor Pitch Deck</h3>
            <p className="infographic-subtitle">January 2026 - 28 Pages - The Complete Story</p>
          </div>
          <a href={documentLinks.pitchDeck} target="_blank" rel="noopener noreferrer" className="download-pill">
            <i className="fas fa-external-link-alt"></i> Open
          </a>
        </div>
        <div className="infographic-body">
          <div className="infographic-section">
            <div className="info-label">WHAT IS CDC? (In Simple Words)</div>
            <div className="simple-explain">
              <div className="explain-box">
                <div className="explain-icon">👟</div>
                <div className="explain-text">
                  <strong>{companyInfo.tagline}</strong>
                  <span>Like a Nike/Adidas store, but with rare & limited edition shoes you can't find anywhere else</span>
                </div>
              </div>
              <div className="explain-box">
                <div className="explain-icon">✅</div>
                <div className="explain-text">
                  <strong>100% Authentic Guarantee</strong>
                  <span>Every product is verified real - no fakes, unlike most online sellers</span>
                </div>
              </div>
              <div className="explain-box">
                <div className="explain-icon">🏪</div>
                <div className="explain-text">
                  <strong>{companyInfo.storeCount} Premium Stores + Website</strong>
                  <span>Physical stores in {storesData.stores.map(s => s.name).join(', ')} + online shopping</span>
                </div>
              </div>
            </div>
          </div>

          <div className="infographic-section">
            <div className="info-label">THE MONEY STORY</div>
            <div className="money-visual">
              <div className="money-year">
                <div className="money-bar" style={{ height: '40px', background: '#ddd' }}></div>
                <div className="money-value">₹{Math.round(revenueData.annual.FY23)} Cr</div>
                <div className="money-label">FY23</div>
              </div>
              <div className="money-year">
                <div className="money-bar" style={{ height: '100px', background: '#9BBF1E' }}></div>
                <div className="money-value">₹{revenueData.annual.FY24} Cr</div>
                <div className="money-label">FY24</div>
              </div>
              <div className="money-year">
                <div className="money-bar" style={{ height: '130px', background: '#6B8E23' }}></div>
                <div className="money-value">₹{revenueData.annual.FY25} Cr</div>
                <div className="money-label">FY25</div>
              </div>
              <div className="money-year">
                <div className="money-bar" style={{ height: '180px', background: '#C0E529' }}></div>
                <div className="money-value">₹{revenueData.annual.FY26Target} Cr</div>
                <div className="money-label">FY26 🎯</div>
              </div>
            </div>
            <div className="growth-badge">📈 10x Growth in 3 Years!</div>
          </div>

          <div className="infographic-section">
            <div className="info-label">HOW CDC MAKES MONEY</div>
            <div className="how-it-works">
              <div className="flow-step">
                <div className="flow-num">1</div>
                <div className="flow-icon">📦</div>
                <div className="flow-text">Get shoes from brands<br /><small>(No upfront payment!)</small></div>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="flow-num">2</div>
                <div className="flow-icon">🏪</div>
                <div className="flow-text">Sell in stores & online<br /><small>(₹{productData.aov.overall.toLocaleString()} avg sale)</small></div>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="flow-num">3</div>
                <div className="flow-icon">💵</div>
                <div className="flow-text">Keep {channelData.margin.blended}% margin<br /><small>(Pay brands the rest)</small></div>
              </div>
            </div>
            <div className="margin-explain">
              <span className="margin-tag">💡 This means: For every ₹100 sale, CDC keeps ₹{channelData.margin.blended} as profit!</span>
            </div>
          </div>

          <div className="infographic-section">
            <div className="info-label">WHY CDC WINS</div>
            <div className="comparison-simple">
              <div className="compare-row header">
                <div></div>
                <div className="compare-cdc">CDC</div>
                <div className="compare-others">Others</div>
              </div>
              <div className="compare-row">
                <div className="compare-label">Real Products?</div>
                <div className="compare-cdc"><span className="big-check">✅</span> {competitionData.cdc.authenticity}%</div>
                <div className="compare-others"><span className="big-x">❌</span> 60-80%</div>
              </div>
              <div className="compare-row">
                <div className="compare-label">Delivered on time?</div>
                <div className="compare-cdc"><span className="big-check">✅</span> {competitionData.cdc.fulfillment}%</div>
                <div className="compare-others"><span className="big-x">❌</span> 10-60%</div>
              </div>
              <div className="compare-row">
                <div className="compare-label">Physical Stores?</div>
                <div className="compare-cdc"><span className="big-check">✅</span> {competitionData.cdc.stores} Stores</div>
                <div className="compare-others"><span className="big-x">❌</span> None/Few</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MIS INFOGRAPHIC */}
      <div className="infographic-card" style={{ marginBottom: '32px' }}>
        <div className="infographic-header olive">
          <div className="infographic-icon"><i className="fas fa-chart-bar"></i></div>
          <div className="infographic-title-wrap">
            <h3 className="infographic-title">MIS & Operational Metrics</h3>
            <p className="infographic-subtitle">YTD FY26 (Apr-Dec 2025) - Live Business Data</p>
          </div>
          <a href={documentLinks.mis} target="_blank" rel="noopener noreferrer" className="download-pill">
            <i className="fas fa-external-link-alt"></i> Open
          </a>
        </div>
        <div className="infographic-body">
          <div className="infographic-section">
            <div className="info-label">CURRENT PERFORMANCE (9 Months)</div>
            <div className="big-metrics">
              <div className="big-metric lime-bg">
                <div className="big-metric-value">₹{revenueData.ytdFY26.gmv} Cr</div>
                <div className="big-metric-label">Total Sales (GMV)</div>
                <div className="big-metric-explain">💡 Money collected from customers</div>
              </div>
              <div className="big-metric white-bg">
                <div className="big-metric-value">₹{revenueData.ytdFY26.operatingRevenue} Cr</div>
                <div className="big-metric-label">Net Revenue</div>
                <div className="big-metric-explain">💡 After returns & discounts</div>
              </div>
              <div className="big-metric olive-bg">
                <div className="big-metric-value">{revenueData.ytdFY26.grossMargin}%</div>
                <div className="big-metric-label">Gross Margin</div>
                <div className="big-metric-explain">💡 Profit before expenses</div>
              </div>
            </div>
          </div>

          <div className="infographic-section">
            <div className="info-label">WHERE DOES MONEY COME FROM?</div>
            <div className="channel-visual">
              <div className="channel-bar">
                <div className="channel-retail" style={{ width: `${channelData.split.retail}%` }}>
                  <span className="channel-icon">🏬</span>
                  <span className="channel-pct">{channelData.split.retail}%</span>
                  <span className="channel-name">Stores</span>
                </div>
                <div className="channel-online" style={{ width: `${channelData.split.online}%` }}>
                  <span className="channel-icon">💻</span>
                  <span className="channel-pct">{channelData.split.online}%</span>
                  <span className="channel-name">Online</span>
                </div>
              </div>
              <div className="channel-details">
                <div className="channel-detail">
                  <span className="detail-emoji">🏬</span>
                  <span><strong>Stores:</strong> ₹{channelData.revenue.retail} Cr - Higher profit ({channelData.margin.retail}% margin) - Premium experience</span>
                </div>
                <div className="channel-detail">
                  <span className="detail-emoji">💻</span>
                  <span><strong>Online:</strong> ₹{channelData.revenue.online} Cr - Lower cost - Reaches all India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="infographic-section">
            <div className="info-label">STORE-BY-STORE BREAKDOWN</div>
            <div className="store-bars">
              {storesData.stores.map((store, index) => {
                const maxRevenue = Math.max(...storesData.stores.map(s => s.revenueYTD));
                const colors = ['var(--lime)', 'var(--olive)', 'var(--olive-dark)'];
                return (
                  <div className="store-bar-item" key={index}>
                    <div className="store-bar-header">
                      <span className="store-bar-name">📍 {store.name}</span>
                      <span className="store-bar-value">₹{store.revenueYTD} Cr</span>
                    </div>
                    <div className="store-bar-track">
                      <div className="store-bar-fill-inner" style={{ width: `${(store.revenueYTD / maxRevenue) * 100}%`, background: colors[index] }}></div>
                    </div>
                    <div className="store-bar-info">{store.type} - {store.area.toLocaleString()} sqft - Since {store.openDate}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="infographic-section">
            <div className="info-label">WHAT SELLS MOST?</div>
            <div className="product-mix-visual">
              <div className="product-item">
                <div className="product-icon-wrap shoes">👟</div>
                <div className="product-info">
                  <div className="product-name">Sneakers & Shoes</div>
                  <div className="product-pct-bar"><div style={{ width: `${productData.mix.sneakers}%`, background: 'var(--lime)' }}></div></div>
                  <div className="product-pct">{productData.mix.sneakers}% of sales</div>
                </div>
              </div>
              <div className="product-item">
                <div className="product-icon-wrap apparel">👕</div>
                <div className="product-info">
                  <div className="product-name">Streetwear & Apparel</div>
                  <div className="product-pct-bar"><div style={{ width: `${productData.mix.streetwear}%`, background: 'var(--olive)' }}></div></div>
                  <div className="product-pct">{productData.mix.streetwear}% of sales</div>
                </div>
              </div>
              <div className="product-item">
                <div className="product-icon-wrap accessories">🎒</div>
                <div className="product-info">
                  <div className="product-name">Accessories</div>
                  <div className="product-pct-bar"><div style={{ width: `${productData.mix.accessories}%`, background: 'var(--olive-dark)' }}></div></div>
                  <div className="product-pct">{productData.mix.accessories}% of sales</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FINANCIALS FY24 INFOGRAPHIC */}
      <div className="infographic-card" style={{ marginBottom: '32px' }}>
        <div className="infographic-header black">
          <div className="infographic-icon"><i className="fas fa-file-invoice-dollar"></i></div>
          <div className="infographic-title-wrap">
            <h3 className="infographic-title">Audited Financials FY24</h3>
            <p className="infographic-subtitle">April 2023 - March 2024 - Official Accounts</p>
          </div>
          <a href={documentLinks.financials} target="_blank" rel="noopener noreferrer" className="download-pill">
            <i className="fas fa-external-link-alt"></i> Open
          </a>
        </div>
        <div className="infographic-body">
          <div className="infographic-section">
            <div className="info-label">BALANCE SHEET EXPLAINED (What CDC Owns & Owes)</div>
            <div className="balance-visual">
              <div className="balance-side owns">
                <div className="balance-title">✅ WHAT CDC OWNS (Assets)</div>
                <div className="balance-total">₹{financials.FY24.assets.total} Crore</div>
                <div className="balance-items">
                  <div className="balance-item">
                    <span className="balance-icon">🏪</span>
                    <span className="balance-name">Store Equipment & Fixtures</span>
                    <span className="balance-val">₹{financials.FY24.assets.equipment * 100} L</span>
                  </div>
                  <div className="balance-item">
                    <span className="balance-icon">📦</span>
                    <span className="balance-name">Inventory (Products)</span>
                    <span className="balance-val">₹{financials.FY24.assets.inventory * 100} L</span>
                  </div>
                  <div className="balance-item">
                    <span className="balance-icon">💵</span>
                    <span className="balance-name">Cash in Bank</span>
                    <span className="balance-val">₹{financials.FY24.assets.cash * 100} L</span>
                  </div>
                  <div className="balance-item">
                    <span className="balance-icon">📄</span>
                    <span className="balance-name">Money Owed to CDC</span>
                    <span className="balance-val">₹{(financials.FY24.assets.receivables * 100).toFixed(1)} L</span>
                  </div>
                </div>
              </div>
              <div className="balance-side owes">
                <div className="balance-title">💳 WHAT CDC OWES (Liabilities)</div>
                <div className="balance-total">₹{(financials.FY24.liabilities.total * 100).toFixed(1)} Lakh</div>
                <div className="balance-items">
                  <div className="balance-item">
                    <span className="balance-icon">🏦</span>
                    <span className="balance-name">Founder Loans</span>
                    <span className="balance-val">₹{(financials.FY24.liabilities.founderLoans * 100).toFixed(1)} L</span>
                  </div>
                  <div className="balance-item">
                    <span className="balance-icon">🏢</span>
                    <span className="balance-name">Supplier Payments Due</span>
                    <span className="balance-val">₹{financials.FY24.liabilities.supplierPayables * 100} L</span>
                  </div>
                  <div className="balance-item">
                    <span className="balance-icon">📋</span>
                    <span className="balance-name">Other Payables</span>
                    <span className="balance-val">₹{financials.FY24.liabilities.otherPayables * 100} L</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="net-worth-box">
              <span className="net-worth-label">🎯 NET WORTH (Owns - Owes)</span>
              <span className="net-worth-value">₹{financials.FY24.netWorth} Crore</span>
              <span className="net-worth-explain">💡 This is the company's real value after paying all debts</span>
            </div>
          </div>

          <div className="infographic-section">
            <div className="info-label">PROFIT & LOSS EXPLAINED (Did CDC Make or Lose Money?)</div>
            <div className="pnl-visual">
              <div className="pnl-item income">
                <div className="pnl-icon">💰</div>
                <div className="pnl-details">
                  <div className="pnl-label">Total Sales Revenue</div>
                  <div className="pnl-value">₹{financials.FY24.revenue} Crore</div>
                </div>
              </div>
              <div className="pnl-minus">−</div>
              <div className="pnl-item expense">
                <div className="pnl-icon">💸</div>
                <div className="pnl-details">
                  <div className="pnl-label">Cost of Products</div>
                  <div className="pnl-value">₹{financials.FY24.costOfGoods} Crore</div>
                </div>
              </div>
              <div className="pnl-minus">−</div>
              <div className="pnl-item expense">
                <div className="pnl-icon">🏢</div>
                <div className="pnl-details">
                  <div className="pnl-label">Operating Costs</div>
                  <div className="pnl-value">₹{financials.FY24.operatingCosts} Crore</div>
                </div>
              </div>
              <div className="pnl-equals">=</div>
              <div className="pnl-item result loss">
                <div className="pnl-icon">📉</div>
                <div className="pnl-details">
                  <div className="pnl-label">Net Loss</div>
                  <div className="pnl-value">-₹{Math.abs(financials.FY24.netProfitLoss * 100)} Lakh</div>
                </div>
              </div>
            </div>
            <div className="loss-explain">
              <div className="loss-reason">
                <span className="reason-icon">🔥</span>
                <span className="reason-text"><strong>Why the loss?</strong> {financials.FY24.lossReason}</span>
              </div>
            </div>
          </div>

          <div className="infographic-section">
            <div className="info-label">KEY FINANCIAL RATIOS (Health Check)</div>
            <div className="ratios-grid">
              <div className="ratio-card good">
                <div className="ratio-name">Current Ratio</div>
                <div className="ratio-value">{financials.FY24.ratios.currentRatio}</div>
                <div className="ratio-status">✅ Healthy</div>
                <div className="ratio-explain">💡 Can pay bills {financials.FY24.ratios.currentRatio.toFixed(1)}x over. Good!</div>
              </div>
              <div className="ratio-card good">
                <div className="ratio-name">Debt-to-Equity</div>
                <div className="ratio-value">{financials.FY24.ratios.debtToEquity}</div>
                <div className="ratio-status">✅ Low Debt</div>
                <div className="ratio-explain">💡 Not over-leveraged. Safe!</div>
              </div>
              <div className="ratio-card excellent">
                <div className="ratio-name">Inventory Turnover</div>
                <div className="ratio-value">{financials.FY24.ratios.inventoryTurnover}x</div>
                <div className="ratio-status">🌟 Excellent</div>
                <div className="ratio-explain">💡 Products sell fast. Very efficient!</div>
              </div>
              <div className="ratio-card neutral">
                <div className="ratio-name">Net Profit Margin</div>
                <div className="ratio-value">{financials.FY24.ratios.netProfitMargin}%</div>
                <div className="ratio-status">⚠️ Loss Year</div>
                <div className="ratio-explain">💡 Due to Mumbai fire incident</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FINANCIALS FY23 INFOGRAPHIC */}
      <div className="infographic-card" style={{ marginBottom: '32px' }}>
        <div className="infographic-header olive">
          <div className="infographic-icon"><i className="fas fa-file-invoice-dollar"></i></div>
          <div className="infographic-title-wrap">
            <h3 className="infographic-title">Audited Financials FY23</h3>
            <p className="infographic-subtitle">Sep 2022 - March 2023 - First Year of Pvt Ltd</p>
          </div>
          <a href={documentLinks.financials} target="_blank" rel="noopener noreferrer" className="download-pill">
            <i className="fas fa-external-link-alt"></i> Open
          </a>
        </div>
        <div className="infographic-body">
          <div className="infographic-section">
            <div className="info-label">FIRST YEAR HIGHLIGHTS (Only 6 Months!)</div>
            <div className="first-year-stats">
              <div className="fy-stat">
                <div className="fy-stat-icon">💰</div>
                <div className="fy-stat-value">₹{financials.FY23.revenue} Cr</div>
                <div className="fy-stat-label">Revenue in 6 months</div>
              </div>
              <div className="fy-stat">
                <div className="fy-stat-icon">✅</div>
                <div className="fy-stat-value">₹{(financials.FY23.netProfit * 100).toFixed(1)} L</div>
                <div className="fy-stat-label">Net Profit</div>
              </div>
              <div className="fy-stat">
                <div className="fy-stat-icon">🏪</div>
                <div className="fy-stat-value">{financials.FY23.stores}</div>
                <div className="fy-stat-label">Store (Delhi)</div>
              </div>
              <div className="fy-stat">
                <div className="fy-stat-icon">💵</div>
                <div className="fy-stat-value">₹{financials.FY23.cashInBank} Cr</div>
                <div className="fy-stat-label">Cash in Bank</div>
              </div>
            </div>
            <div className="fy23-note">
              <span className="note-icon">💡</span>
              <span className="note-text"><strong>Key Point:</strong> This was CDC's first year as a Private Limited company. Started with just 1 store in Delhi and was already profitable!</span>
            </div>
          </div>

          <div className="infographic-section">
            <div className="info-label">FY23 vs FY24 GROWTH</div>
            <div className="growth-comparison">
              <div className="growth-metric">
                <div className="growth-label">Revenue</div>
                <div className="growth-bars">
                  <div className="growth-bar-row">
                    <span className="growth-year">FY23</span>
                    <div className="growth-fill" style={{ width: `${(financials.FY23.revenue / financials.FY24.revenue) * 100}%` }}></div>
                    <span className="growth-val">₹{financials.FY23.revenue} Cr</span>
                  </div>
                  <div className="growth-bar-row fy24">
                    <span className="growth-year">FY24</span>
                    <div className="growth-fill" style={{ width: '100%' }}></div>
                    <span className="growth-val">₹{financials.FY24.revenue} Cr</span>
                  </div>
                </div>
                <div className="growth-pct">📈 {(financials.FY24.revenue / financials.FY23.revenue).toFixed(1)}x Growth!</div>
              </div>
              <div className="growth-metric">
                <div className="growth-label">Stores</div>
                <div className="growth-bars">
                  <div className="growth-bar-row">
                    <span className="growth-year">FY23</span>
                    <div className="growth-fill" style={{ width: '33%' }}></div>
                    <span className="growth-val">{financials.FY23.stores} Store</span>
                  </div>
                  <div className="growth-bar-row fy24">
                    <span className="growth-year">FY24</span>
                    <div className="growth-fill" style={{ width: '66%' }}></div>
                    <span className="growth-val">2 Stores</span>
                  </div>
                </div>
                <div className="growth-pct">📈 +Mumbai Added!</div>
              </div>
              <div className="growth-metric">
                <div className="growth-label">Net Worth</div>
                <div className="growth-bars">
                  <div className="growth-bar-row">
                    <span className="growth-year">FY23</span>
                    <div className="growth-fill" style={{ width: `${(financials.FY23.netWorth / financials.FY24.netWorth) * 100}%` }}></div>
                    <span className="growth-val">₹{(financials.FY23.netWorth * 100).toFixed(1)} L</span>
                  </div>
                  <div className="growth-bar-row fy24">
                    <span className="growth-year">FY24</span>
                    <div className="growth-fill" style={{ width: '100%' }}></div>
                    <span className="growth-val">₹{financials.FY24.netWorth} Cr</span>
                  </div>
                </div>
                <div className="growth-pct">📈 {(financials.FY24.netWorth / financials.FY23.netWorth).toFixed(1)}x Growth!</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INVESTOR FAQ INFOGRAPHIC */}
      <div className="infographic-card" style={{ marginBottom: '32px' }}>
        <div className="infographic-header lime">
          <div className="infographic-icon"><i className="fas fa-question-circle"></i></div>
          <div className="infographic-title-wrap">
            <h3 className="infographic-title">Investor FAQ</h3>
            <p className="infographic-subtitle">27+ Questions Answered - November 2025</p>
          </div>
          <a href={documentLinks.investorFaq} target="_blank" rel="noopener noreferrer" className="download-pill">
            <i className="fas fa-external-link-alt"></i> Open
          </a>
        </div>
        <div className="infographic-body">
          <div className="infographic-section">
            <div className="info-label">TOP INVESTOR QUESTIONS (Quick Answers)</div>
            <div className="faq-grid">
              <div className="faq-item">
                <div className="faq-q">What does CDC sell?</div>
                <div className="faq-a">Premium sneakers (Nike, Adidas, Jordan, Yeezy), streetwear, and accessories - all 100% authentic</div>
              </div>
              <div className="faq-item">
                <div className="faq-q">How does CDC make money?</div>
                <div className="faq-a">{channelData.margin.blended}% margin on each sale. Gets products from brands, sells to customers, keeps the difference</div>
              </div>
              <div className="faq-item">
                <div className="faq-q">What is SOR model?</div>
                <div className="faq-a">"Sell Or Return" - CDC doesn't pay upfront for inventory. Only pays brands after selling. Zero risk!</div>
              </div>
              <div className="faq-item">
                <div className="faq-q">Who are the customers?</div>
                <div className="faq-a">Urban males, 14-35 years, earning ₹10-50 LPA. Sneakerheads & fashion enthusiasts</div>
              </div>
              <div className="faq-item">
                <div className="faq-q">What's the market size?</div>
                <div className="faq-a">₹15,150 Cr today → ₹35,000 Cr by 2030. CDC targets 3% = ₹1,000 Cr revenue</div>
              </div>
              <div className="faq-item">
                <div className="faq-q">Why invest now?</div>
                <div className="faq-a">10x growth in 3 years, market leader, capital-efficient model, scaling to 10+ stores</div>
              </div>
            </div>
          </div>

          <div className="infographic-section">
            <div className="info-label">FAQ COVERS THESE TOPICS</div>
            <div className="topics-visual">
              <div className="topic-tag"><span>🏢</span> Company Overview</div>
              <div className="topic-tag"><span>💼</span> Business Model</div>
              <div className="topic-tag"><span>💰</span> Revenue & Financials</div>
              <div className="topic-tag"><span>📊</span> Market Analysis</div>
              <div className="topic-tag"><span>🏆</span> Competition</div>
              <div className="topic-tag"><span>📈</span> Growth Strategy</div>
              <div className="topic-tag"><span>🏪</span> Store Economics</div>
              <div className="topic-tag"><span>💵</span> Funding Plans</div>
              <div className="topic-tag"><span>👥</span> Team & Leadership</div>
              <div className="topic-tag"><span>⚠️</span> Risk Factors</div>
            </div>
          </div>
        </div>
      </div>

      {/* DOWNLOAD ALL SECTION */}
      <div className="download-all-section">
        <div className="download-all-content">
          <div className="download-all-icon">📁</div>
          <div className="download-all-text">
            <h3>Access Complete Data Room</h3>
            <p>Open Google Drive folder with all documents - Pitch Deck, MIS, Financials, FAQ & more</p>
          </div>
          <a href={documentLinks.dataRoom} target="_blank" rel="noopener noreferrer" className="download-all-btn">
            <i className="fas fa-external-link-alt"></i> Open Data Room
          </a>
        </div>
      </div>
    </section>
  );
}

export default Documents;

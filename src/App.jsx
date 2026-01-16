import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  auth, 
  loginWithEmail, 
  loginWithGoogle, 
  logout, 
  onAuthStateChanged,
  ADMIN_EMAILS,
  DRIVE_API_KEY,
  DRIVE_FOLDERS,
  saveSession,
  saveActivity,
  getInvestorSessions,
  getActivities,
  saveDataCard,
  updateDataCard,
  deleteDataCard,
  getDataCards
} from './firebase';

// ==================== AI KNOWLEDGE BASE ====================
const aiKnowledgeBase = {
  "revenue": `<strong>Revenue Performance:</strong><br><br>
    <strong>FY24 Audited:</strong> ₹18.2 Cr<br>
    <strong>FY23 Audited:</strong> ₹8.5 Cr<br>
    <strong>YoY Growth:</strong> <span style="background:var(--lime);padding:2px 8px;border-radius:4px;">114%</span><br><br>
    <strong>FY26 YTD (Apr-Dec):</strong> ₹66.5 Cr<br>
    • Online: ₹41.9 Cr (63%)<br>
    • Retail: ₹24.6 Cr (37%)`,

  "net profit|profit|profitability": `<strong>Profitability:</strong><br><br>
    <strong>FY24:</strong> Net Profit ₹6.18 Cr (34% margin)<br>
    <strong>FY23:</strong> Net Profit ₹56.2 L<br><br>
    <strong>Key Ratios:</strong><br>
    • ROE: 58.6%<br>
    • ROCE: 56.3%<br>
    • Operating Margin: 35%`,

  "store|retail|delhi|mumbai|hyderabad": `<strong>Retail Store Performance (FY26 YTD):</strong><br><br>
    <strong>Delhi (CP):</strong> ₹11.9 Cr | CM2: 14.8%<br>
    <strong>Mumbai (Bandra):</strong> ₹9.2 Cr | CM2: 17.5%<br>
    <strong>Hyderabad (Jubilee):</strong> ₹3.5 Cr | CM2: 18.2%<br><br>
    <strong>Total Retail:</strong> ₹24.6 Cr (37% of revenue)`,

  "ltv|cac|unit economics": `<strong>Unit Economics:</strong><br><br>
    <strong>LTV:CAC Ratio:</strong> <span style="background:var(--lime);padding:2px 8px;border-radius:4px;">62:1</span><br>
    <strong>Customer Acquisition Cost:</strong> ₹250<br>
    <strong>Lifetime Value:</strong> ₹15,500<br><br>
    <strong>Contribution Margins:</strong><br>
    • Online CM2: 7.8%<br>
    • Retail CM2: 16.9%`,

  "gross margin|margin": `<strong>Margin Analysis:</strong><br><br>
    <strong>Gross Margin:</strong> 45% (FY24)<br>
    <strong>Operating Margin:</strong> 35%<br>
    <strong>Net Margin:</strong> 34%<br><br>
    <strong>Channel-wise:</strong><br>
    • Online CM2: 7.8%<br>
    • Retail CM2: 16.9%`,

  "balance sheet|assets": `<strong>Balance Sheet Highlights (FY24):</strong><br><br>
    <strong>Assets:</strong><br>
    • Cash & Bank: ₹6.16 Cr<br>
    • Inventory: ₹4.2 Cr<br>
    • Receivables: ₹1.8 Cr<br><br>
    <strong>Key Ratios:</strong><br>
    • Current Ratio: 2.8x<br>
    • Debt/Equity: 0.12x`,

  "business model|how does|model": `<strong>Business Model - Sale or Return (SOR):</strong><br><br>
    <strong>How it works:</strong><br>
    1. Consignors list products on CDC<br>
    2. CDC markets & sells to customers<br>
    3. Payment to consignor only after sale<br><br>
    <strong>Benefits:</strong><br>
    • Zero inventory risk<br>
    • Asset-light operations<br>
    • Scalable model`,

  "online|website|ecommerce": `<strong>Online Performance (FY26 YTD):</strong><br><br>
    <strong>Revenue:</strong> ₹41.9 Cr (63% of total)<br>
    <strong>Monthly Visitors:</strong> 600K+<br>
    <strong>CM2 Margin:</strong> 7.8%<br><br>
    <strong>Note:</strong> Retail stores show better profitability (CM2: 16.9%) due to lower marketing costs.`,

  "10 reasons|reasons to invest|why invest": `<strong>🔥 10 Reasons to Invest in CDC:</strong><br><br>
    <strong>1. Market Leader</strong> - India's #1 sneaker platform, 600K+ monthly visitors<br>
    <strong>2. Explosive Growth</strong> - ₹8.5 Cr → ₹18.2 Cr (114% YoY)<br>
    <strong>3. Profitable & Cash-Rich</strong> - Net Profit ₹6.18 Cr, Cash ₹6.16 Cr<br>
    <strong>4. Strong Unit Economics</strong> - LTV:CAC 62:1<br>
    <strong>5. Asset-Light Model</strong> - SOR reduces inventory risk<br>
    <strong>6. Marquee Investors</strong> - PharmEasy founders, Masaba Gupta<br>
    <strong>7. Multi-Channel</strong> - Website + 3 experiential stores<br>
    <strong>8. Platform Play</strong> - 50+ Indian streetwear brands<br>
    <strong>9. Large Market</strong> - India sneaker market growing 15%+ annually<br>
    <strong>10. Clear Roadmap</strong> - 35 stores in 3-5 years`,

  "investor|funded|raised": `<strong>CDC Investor Base:</strong><br><br>
    <strong>Marquee Investors:</strong><br>
    • Dharmil Seth (Co-founder, PharmEasy)<br>
    • Siddharth Shah (Co-founder, PharmEasy)<br>
    • Masaba Gupta (Fashion Designer)<br>
    • Nikhil Mehra (Fashion Designer)<br>
    • Rahul Kayan (Director, SMIFS Ltd)<br>
    • Harminder Sahni (Founder, Wazir Advisors)<br><br>
    <strong>Total Raised:</strong> ~₹14 Crores in seed funding`,

  "shareholding|ownership|equity": `<strong>Shareholding Pattern:</strong><br><br>
    <strong>Promoter Holdings:</strong><br>
    • Anchit Kapil (CEO): 29.46%<br>
    • Shaurya Kumar: 29.46%<br>
    • Bharat Mehrotra: 29.46%<br><br>
    <strong>Investor Holdings (CCPS):</strong> 11.63%<br><br>
    <strong>Capital Structure:</strong><br>
    • Equity Shares: 15,000 (₹10 face value)<br>
    • CCPS: 1,975 shares`,

  "growth|expansion|plan": `<strong>Growth Strategy:</strong><br><br>
    <strong>📍 Store Expansion:</strong><br>
    • Next: Colaba, South Mumbai (Jan 2025)<br>
    • Target: 15 stores in next 2 years<br>
    • Vision: 35 stores across India in 3-5 years<br><br>
    <strong>💰 Revenue Targets:</strong><br>
    • FY24 Actual: ₹18.2 Cr<br>
    • FY25 Target: ₹45 Cr (2.5x)`,

  "founder|team|anchit|ceo": `<strong>Founding Team:</strong><br><br>
    <strong>Anchit Kapil - CEO & Co-founder</strong><br>
    • Director Remuneration: ₹24 Lakhs/year<br><br>
    <strong>Shaurya Kumar - Co-founder</strong><br>
    • Director Remuneration: ₹24 Lakhs/year<br><br>
    <strong>Bharat Mehrotra - Co-founder</strong><br>
    • Strategic & Operations<br><br>
    <strong>Origin:</strong> Started 2019 searching for Yeezys, built Instagram community → India's largest sneaker platform`,

  "product|category|brand|sell": `<strong>Product Categories:</strong><br><br>
    <strong>👟 Sneakers (84% of GMV):</strong><br>
    Nike, Jordan, Adidas, Yeezy, New Balance, HOKA, Louis Vuitton, Dior, Balenciaga<br><br>
    <strong>👕 Streetwear (16% of GMV):</strong><br>
    50+ Indian brands: Balav, Farak, Kilogram, Natty Garb, Huemn<br><br>
    <strong>⌚ Watches:</strong> Casio, G-Shock, Omega x Swatch<br>
    <strong>🎭 Collectibles:</strong> Bearbricks, KAWS, Funko`,

  "risk|challenge": `<strong>Key Risks & Mitigants:</strong><br><br>
    <strong>⚠️ Operational:</strong><br>
    1. Mumbai Store Fire (June 2024) - Insurance claim filed<br>
    2. Counterfeit Risk - 100% authenticity guarantee<br>
    3. Inventory Obsolescence - Dropshipping model<br><br>
    <strong>✅ Mitigants:</strong><br>
    Strong cash (₹6.16 Cr), omnichannel, consignment model`,

  "competition|competitor": `<strong>Competitive Landscape:</strong><br><br>
    <strong>Direct Competitors:</strong><br>
    • Superkicks India<br>
    • Culture Circle (raised $2M)<br>
    • DawnTown, Mainstreet Marketplace<br><br>
    <strong>CDC Advantages:</strong><br>
    1. Experiential retail - Asia's largest sneaker wall<br>
    2. Indian streetwear - Exclusive partnerships<br>
    3. First-mover - Community since 2019<br>
    4. Omnichannel - Website + 3 stores`
};

const findAIAnswer = (query) => {
  query = query.toLowerCase();
  for (let key in aiKnowledgeBase) {
    const patterns = key.split('|');
    for (let pattern of patterns) {
      if (query.includes(pattern.toLowerCase())) {
        return aiKnowledgeBase[key];
      }
    }
  }
  // Additional matching
  if (query.includes('gmv') || query.includes('sales') || query.includes('turnover')) return aiKnowledgeBase['revenue'];
  if (query.includes('invest') && (query.includes('why') || query.includes('reason'))) return aiKnowledgeBase['10 reasons|reasons to invest|why invest'];
  
  return `I have comprehensive data on CDC covering:<br><br>
    📊 <strong>Financials:</strong> FY23 & FY24 audited statements, YTD FY26 MIS<br>
    🏪 <strong>Operations:</strong> Store-wise P&L, unit economics<br>
    📈 <strong>Growth:</strong> Revenue trajectory, expansion plans<br>
    💰 <strong>Investment:</strong> Thesis, investor base, shareholding<br>
    ⚠️ <strong>Risks:</strong> Key challenges and mitigants<br><br>
    Try: "Net profit FY24", "10 reasons to invest", "Store performance", "Unit economics"`;
};

// ==================== UTILITIES ====================
const formatDate = (date) => {
  if (!date) return 'N/A';
  const d = date.toDate ? date.toDate() : new Date(date);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatDateTime = (date) => {
  if (!date) return 'N/A';
  const d = date.toDate ? date.toDate() : new Date(date);
  return d.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
};

const getLocationData = async () => {
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) });
    return await res.json();
  } catch { return { city: 'Unknown', country: 'Unknown' }; }
};

// ==================== LOGIN PAGE ====================
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('investor');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try { 
      await loginWithEmail(email, password); 
    } catch (err) { 
      setError(err.message.includes('invalid') ? 'Invalid email or password' : err.message); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleGoogleLogin = async () => {
    setError(''); setLoading(true);
    try { 
      await loginWithGoogle(); 
    } catch { 
      setError('Google sign-in failed. Please try again.'); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div className="logo">
            <span className="logo-top">CREPDOG</span>
            <span className="logo-bottom">CREW</span>
          </div>
          <div className="logo-badge">INVESTOR DATA ROOM</div>
        </div>

        <div className="login-card">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to access the investor portal</p>

          <div className="login-tabs">
            <button onClick={() => setActiveTab('investor')} className={`login-tab ${activeTab === 'investor' ? 'active' : ''}`}>
              Investor
            </button>
            <button onClick={() => setActiveTab('admin')} className={`login-tab ${activeTab === 'admin' ? 'active' : ''}`}>
              Admin
            </button>
          </div>

          {activeTab === 'admin' && (
            <div className="admin-notice">
              <i className="fas fa-lock"></i>
              <span>Admin access for authorized personnel only</span>
            </div>
          )}

          {error && (
            <div className="error-alert">
              <i className="fas fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleEmailLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <i className="fas fa-envelope"></i>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder={activeTab === 'admin' ? 'admin@crepdogcrew.com' : 'investor@company.com'} 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <i className="fas fa-lock"></i>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter your password" 
                  required 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password">
                  <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? <><i className="fas fa-spinner fa-spin"></i> Signing in...</> : 'Sign In'}
            </button>
          </form>

          <div className="divider"><span>or continue with</span></div>

          <button onClick={handleGoogleLogin} className="btn-google" disabled={loading}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="login-footer">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

// ==================== OCR READER MODAL ====================
const OCRReaderModal = ({ isOpen, onClose, onDataExtracted }) => {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFiles = (fileList) => {
    const validFiles = fileList.filter(f => 
      f.type === 'application/pdf' || f.type.startsWith('image/')
    );
    setFiles(prev => [...prev, ...validFiles]);
  };

  const processFiles = async () => {
    setProcessing(true);
    const processedResults = [];

    for (const file of files) {
      try {
        // Simulate OCR processing (in production, use actual OCR API)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData = {
          fileName: file.name,
          extractedData: {
            revenue: '₹18.2 Cr',
            profit: '₹6.18 Cr',
            growth: '114%',
            date: new Date().toISOString()
          },
          confidence: 0.95,
          rawText: `Sample extracted text from ${file.name}...`
        };
        processedResults.push(mockData);
      } catch (err) {
        processedResults.push({ fileName: file.name, error: err.message });
      }
    }

    setResults(processedResults);
    setProcessing(false);
  };

  const handleImport = () => {
    if (onDataExtracted) {
      onDataExtracted(results);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2><i className="fas fa-file-alt"></i> OCR Document Reader</h2>
          <button className="modal-close" onClick={onClose}><i className="fas fa-times"></i></button>
        </div>

        <div className="modal-body">
          {/* Upload Zone */}
          <div 
            className={`upload-zone ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="application/pdf,image/*"
              onChange={(e) => handleFiles(Array.from(e.target.files))}
              style={{ display: 'none' }}
            />
            <i className="fas fa-cloud-upload-alt"></i>
            <p><strong>Drop files here</strong> or click to browse</p>
            <span>Supports PDF, PNG, JPG files</span>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="file-list">
              <h4>Selected Files ({files.length})</h4>
              {files.map((file, i) => (
                <div key={i} className="file-item">
                  <i className={`fas fa-file-${file.type.includes('pdf') ? 'pdf' : 'image'}`}></i>
                  <span>{file.name}</span>
                  <span className="file-size">{(file.size / 1024).toFixed(1)} KB</span>
                  <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Processing Status */}
          {processing && (
            <div className="processing-status">
              <div className="spinner"></div>
              <p>Processing documents with OCR...</p>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && !processing && (
            <div className="ocr-results">
              <h4>Extracted Data</h4>
              {results.map((r, i) => (
                <div key={i} className="result-card">
                  <div className="result-header">
                    <strong>{r.fileName}</strong>
                    {r.confidence && <span className="badge green">{(r.confidence * 100).toFixed(0)}% confidence</span>}
                  </div>
                  {r.error ? (
                    <p className="error">{r.error}</p>
                  ) : (
                    <div className="extracted-fields">
                      {Object.entries(r.extractedData).map(([key, value]) => (
                        <div key={key} className="field">
                          <label>{key}:</label>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          {files.length > 0 && !results.length && (
            <button className="btn-primary" onClick={processFiles} disabled={processing}>
              {processing ? 'Processing...' : 'Process Files'}
            </button>
          )}
          {results.length > 0 && (
            <button className="btn-primary" onClick={handleImport}>
              <i className="fas fa-download"></i> Import Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== DATA CARDS EDITOR ====================
const DataCardsEditor = ({ isOpen, onClose, dataCards, onSave, onUpdate, onDelete }) => {
  const [cards, setCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [newCard, setNewCard] = useState({ category: '', title: '', fields: [] });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    setCards(dataCards || []);
  }, [dataCards]);

  const categories = ['Financial', 'Operational', 'Growth', 'Investment', 'Risk'];

  const handleAddField = (cardId) => {
    if (editingCard === cardId) {
      const card = cards.find(c => c.id === cardId);
      card.fields.push({ label: '', value: '' });
      setCards([...cards]);
    } else {
      setNewCard(prev => ({ ...prev, fields: [...prev.fields, { label: '', value: '' }] }));
    }
  };

  const handleSaveCard = async () => {
    if (!newCard.title || !newCard.category) return;
    try {
      await onSave(newCard);
      setNewCard({ category: '', title: '', fields: [] });
      setShowAddForm(false);
    } catch (err) {
      console.error('Error saving card:', err);
    }
  };

  const handleUpdateCard = async (card) => {
    try {
      await onUpdate(card.id, card);
      setEditingCard(null);
    } catch (err) {
      console.error('Error updating card:', err);
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (!window.confirm('Are you sure you want to delete this card?')) return;
    try {
      await onDelete(cardId);
      setCards(cards.filter(c => c.id !== cardId));
    } catch (err) {
      console.error('Error deleting card:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content wide" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2><i className="fas fa-th-large"></i> Data Cards Editor</h2>
          <button className="modal-close" onClick={onClose}><i className="fas fa-times"></i></button>
        </div>

        <div className="modal-body">
          {/* Add New Card Button */}
          {!showAddForm && (
            <button className="btn-primary" onClick={() => setShowAddForm(true)} style={{ marginBottom: '20px' }}>
              <i className="fas fa-plus"></i> Add New Card
            </button>
          )}

          {/* Add Card Form */}
          {showAddForm && (
            <div className="card-form cdc-card white">
              <h4>New Data Card</h4>
              <div className="form-row">
                <select 
                  value={newCard.category} 
                  onChange={(e) => setNewCard({ ...newCard, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input 
                  type="text" 
                  placeholder="Card Title" 
                  value={newCard.title}
                  onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                />
              </div>
              
              <div className="fields-section">
                <h5>Fields</h5>
                {newCard.fields.map((field, i) => (
                  <div key={i} className="field-row">
                    <input 
                      type="text" 
                      placeholder="Label" 
                      value={field.label}
                      onChange={(e) => {
                        const fields = [...newCard.fields];
                        fields[i].label = e.target.value;
                        setNewCard({ ...newCard, fields });
                      }}
                    />
                    <input 
                      type="text" 
                      placeholder="Value" 
                      value={field.value}
                      onChange={(e) => {
                        const fields = [...newCard.fields];
                        fields[i].value = e.target.value;
                        setNewCard({ ...newCard, fields });
                      }}
                    />
                    <button onClick={() => {
                      const fields = newCard.fields.filter((_, idx) => idx !== i);
                      setNewCard({ ...newCard, fields });
                    }}><i className="fas fa-trash"></i></button>
                  </div>
                ))}
                <button className="btn-small" onClick={() => handleAddField(null)}>
                  <i className="fas fa-plus"></i> Add Field
                </button>
              </div>

              <div className="form-actions">
                <button className="btn-secondary" onClick={() => { setShowAddForm(false); setNewCard({ category: '', title: '', fields: [] }); }}>Cancel</button>
                <button className="btn-primary" onClick={handleSaveCard}>Save Card</button>
              </div>
            </div>
          )}

          {/* Cards Grid */}
          <div className="cards-grid">
            {cards.map(card => (
              <div key={card.id} className={`data-card cdc-card ${editingCard === card.id ? 'editing' : ''}`}>
                <div className="card-header">
                  <span className={`category-badge ${card.category?.toLowerCase()}`}>{card.category}</span>
                  <div className="card-actions">
                    {editingCard === card.id ? (
                      <>
                        <button onClick={() => handleUpdateCard(card)}><i className="fas fa-check"></i></button>
                        <button onClick={() => setEditingCard(null)}><i className="fas fa-times"></i></button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setEditingCard(card.id)}><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDeleteCard(card.id)}><i className="fas fa-trash"></i></button>
                      </>
                    )}
                  </div>
                </div>
                
                {editingCard === card.id ? (
                  <input 
                    type="text" 
                    value={card.title}
                    onChange={(e) => {
                      const updated = cards.map(c => c.id === card.id ? { ...c, title: e.target.value } : c);
                      setCards(updated);
                    }}
                    className="card-title-input"
                  />
                ) : (
                  <h3>{card.title}</h3>
                )}

                <div className="card-fields">
                  {card.fields?.map((field, i) => (
                    <div key={i} className="metric-row">
                      <div className="metric-row-icon"><i className="fas fa-chart-line"></i></div>
                      {editingCard === card.id ? (
                        <>
                          <input 
                            type="text" 
                            value={field.label}
                            onChange={(e) => {
                              const updated = cards.map(c => {
                                if (c.id === card.id) {
                                  c.fields[i].label = e.target.value;
                                }
                                return c;
                              });
                              setCards(updated);
                            }}
                          />
                          <input 
                            type="text" 
                            value={field.value}
                            onChange={(e) => {
                              const updated = cards.map(c => {
                                if (c.id === card.id) {
                                  c.fields[i].value = e.target.value;
                                }
                                return c;
                              });
                              setCards(updated);
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <div className="metric-row-label">{field.label}</div>
                          <div className="metric-row-value">{field.value}</div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN DASHBOARD ====================
const Dashboard = ({ user, isAdmin }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [dataCards, setDataCards] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [activities, setActivities] = useState([]);
  const [driveFiles, setDriveFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Modals
  const [ocrModalOpen, setOcrModalOpen] = useState(false);
  const [dataCardsEditorOpen, setDataCardsEditorOpen] = useState(false);
  
  // Chatbot
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m your CDC AI Assistant. Ask me anything about Crepdog Crew - financials, stores, growth plans, or investment thesis.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatRef = useRef(null);

  // Load Data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Save session
        const location = await getLocationData();
        saveSession(user.uid, { 
          email: user.email, 
          displayName: user.displayName,
          location, 
          startTime: new Date().toISOString() 
        }).catch(console.error);

        // Load data based on role
        if (isAdmin) {
          const [sessionsData, cardsData, activitiesData] = await Promise.all([
            getInvestorSessions().catch(() => []),
            getDataCards().catch(() => []),
            getActivities().catch(() => [])
          ]);
          setSessions(sessionsData);
          setDataCards(cardsData);
          setActivities(activitiesData);
        } else {
          const cardsData = await getDataCards().catch(() => []);
          setDataCards(cardsData);
        }

        // Fetch Drive files
        await fetchDriveFiles();
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, isAdmin]);

  const fetchDriveFiles = async () => {
    const allFiles = [];
    for (const [name, folderId] of Object.entries(DRIVE_FOLDERS)) {
      try {
        const res = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${DRIVE_API_KEY}&fields=files(id,name,mimeType,modifiedTime,webViewLink)`
        );
        const data = await res.json();
        if (data.files) {
          allFiles.push(...data.files.map(f => ({ ...f, folder: name })));
        }
      } catch (err) {
        console.error(`Error fetching ${name}:`, err);
      }
    }
    setDriveFiles(allFiles);
  };

  const handleFileView = async (file) => {
    try {
      await saveActivity(user.uid, {
        type: 'file_view',
        fileName: file.name,
        fileId: file.id,
        folder: file.folder
      });
    } catch (err) {
      console.error('Error saving activity:', err);
    }
    window.open(file.webViewLink, '_blank');
  };

  // Chatbot functions
  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { type: 'user', text: chatInput }]);
    const answer = findAIAnswer(chatInput);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { type: 'bot', text: answer }]);
    }, 400);
    setChatInput('');
  };

  const askAI = (q) => {
    setChatMessages(prev => [...prev, { type: 'user', text: q }]);
    const answer = findAIAnswer(q);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { type: 'bot', text: answer }]);
    }, 400);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Navigation items
  const navItems = [
    { id: 'overview', label: 'Overview', icon: 'fa-home' },
    { id: 'financials', label: 'Financials', icon: 'fa-chart-line' },
    { id: 'stores', label: 'Stores', icon: 'fa-store' },
    { id: 'documents', label: 'Documents', icon: 'fa-folder' },
    ...(isAdmin ? [
      { id: 'investors', label: 'Investors', icon: 'fa-users' },
      { id: 'analytics', label: 'Analytics', icon: 'fa-chart-bar' }
    ] : [])
  ];

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Mobile Header */}
      <div className="mobile-header">
        <div className="mobile-logo">CREPDOG CREW</div>
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && <div className="sidebar-overlay active" onClick={() => setMobileMenuOpen(false)}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="logo-container">
          <div className="logo">
            <span className="logo-top">CREPDOG</span>
            <span className="logo-bottom">CREW</span>
          </div>
          <div className="logo-badge">INVESTOR DATA ROOM</div>
        </div>

        <nav className="nav">
          {navItems.map(item => (
            <button 
              key={item.id} 
              onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }} 
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            >
              <div className="icon"><i className={`fas ${item.icon}`}></i></div>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          {isAdmin && (
            <>
              <button className="sidebar-btn" onClick={() => setOcrModalOpen(true)}>
                <i className="fas fa-file-alt"></i> OCR Reader
              </button>
              <button className="sidebar-btn" onClick={() => setDataCardsEditorOpen(true)}>
                <i className="fas fa-th-large"></i> Edit Cards
              </button>
            </>
          )}
          
          <div className="user-section">
            <div className="user-info">
              <div className="user-avatar">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                ) : (
                  <i className="fas fa-user"></i>
                )}
              </div>
              <div className="user-details">
                <span className="user-email">{user.email}</span>
                <span className="user-role">{isAdmin ? 'Admin' : 'Investor'}</span>
              </div>
            </div>
            <button onClick={() => logout()} className="logout-btn">
              <i className="fas fa-sign-out-alt"></i> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main">
        <div className="page-header">
          <div>
            <h1 className="page-title">
              <span className="title-highlight">
                {navItems.find(i => i.id === activeSection)?.label || 'Dashboard'}
              </span>
            </h1>
            <div className="title-underline"></div>
            <p className="page-subtitle">Welcome back, {user.displayName || user.email?.split('@')[0]}</p>
          </div>
          <div className="header-logo">
            <span>CREPDOG</span>
            <span>CREW</span>
          </div>
        </div>

        {/* ==================== OVERVIEW SECTION ==================== */}
        {activeSection === 'overview' && (
          <div className="section active">
            <div className="stat-pills">
              <div className="stat-pill">
                <div className="stat-pill-label">Revenue FY24</div>
                <div className="stat-pill-value">₹18.2 Cr</div>
              </div>
              <div className="stat-pill">
                <div className="stat-pill-label">YoY Growth</div>
                <div className="stat-pill-value">114%</div>
              </div>
              <div className="stat-pill">
                <div className="stat-pill-label">Net Profit</div>
                <div className="stat-pill-value">₹6.18 Cr</div>
              </div>
              <div className="stat-pill">
                <div className="stat-pill-label">LTV:CAC</div>
                <div className="stat-pill-value">62:1</div>
              </div>
            </div>

            {/* Problem Cards - from original design */}
            <div className="grid grid-3">
              <div className="problem-card">
                <div className="problem-badge"><i className="fas fa-exclamation"></i></div>
                <div className="problem-stat">84%</div>
                <p className="problem-text"><strong>Struggle to find authentic sneakers</strong> at reasonable prices in India</p>
              </div>
              <div className="problem-card">
                <div className="problem-badge"><i className="fas fa-clock"></i></div>
                <div className="problem-stat">3-4 Weeks</div>
                <p className="problem-text"><strong>Average delivery time</strong> when ordering from international platforms</p>
              </div>
              <div className="problem-card">
                <div className="problem-badge"><i className="fas fa-rupee-sign"></i></div>
                <div className="problem-stat">40%+</div>
                <p className="problem-text"><strong>Premium markup</strong> on international platforms due to customs & shipping</p>
              </div>
            </div>

            <div className="grid grid-2" style={{ marginTop: '24px' }}>
              {/* Recent Documents */}
              <div className="cdc-card white">
                <div className="chart-header">
                  <div className="chart-title">Recent Documents</div>
                  <div className="chart-underline"></div>
                </div>
                {driveFiles.slice(0, 5).map(file => (
                  <div 
                    key={file.id} 
                    className="metric-row" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleFileView(file)}
                  >
                    <div className="metric-row-icon">
                      <i className={`fas fa-file-${file.mimeType?.includes('pdf') ? 'pdf' : 'alt'}`}></i>
                    </div>
                    <div className="metric-row-label">{file.name}</div>
                    <div className="metric-row-value">{file.folder.replace(/_/g, ' ')}</div>
                  </div>
                ))}
              </div>

              {/* Store Performance */}
              <div className="cdc-card white">
                <div className="chart-header">
                  <div className="chart-title">Store Performance</div>
                  <div className="chart-underline"></div>
                </div>
                {[
                  { name: 'Delhi', revenue: '₹11.9 Cr', cm2: '14.8%' },
                  { name: 'Mumbai', revenue: '₹9.2 Cr', cm2: '17.5%' },
                  { name: 'Hyderabad', revenue: '₹3.5 Cr', cm2: '18.2%' }
                ].map((store, i) => (
                  <div key={i} className="metric-row">
                    <div className="metric-row-icon"><i className="fas fa-store"></i></div>
                    <div className="metric-row-label">{store.name}</div>
                    <div className="metric-row-value">{store.revenue}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== FINANCIALS SECTION ==================== */}
        {activeSection === 'financials' && (
          <div className="section active">
            <div className="stat-pills">
              <div className="stat-pill">
                <div className="stat-pill-label">Revenue FY24</div>
                <div className="stat-pill-value">₹18.2 Cr</div>
              </div>
              <div className="stat-pill">
                <div className="stat-pill-label">Gross Margin</div>
                <div className="stat-pill-value">45%</div>
              </div>
              <div className="stat-pill">
                <div className="stat-pill-label">Net Margin</div>
                <div className="stat-pill-value">34%</div>
              </div>
              <div className="stat-pill">
                <div className="stat-pill-label">ROE</div>
                <div className="stat-pill-value">58.6%</div>
              </div>
            </div>

            <div className="grid grid-2">
              <div className="cdc-card white">
                <div className="chart-header">
                  <div className="chart-title">P&L Highlights</div>
                  <div className="chart-underline"></div>
                </div>
                {[
                  { label: 'Revenue', fy23: '₹8.5 Cr', fy24: '₹18.2 Cr' },
                  { label: 'Gross Profit', fy23: '₹3.8 Cr', fy24: '₹8.2 Cr' },
                  { label: 'Operating Profit', fy23: '₹1.2 Cr', fy24: '₹6.4 Cr' },
                  { label: 'Net Profit', fy23: '₹56 L', fy24: '₹6.18 Cr' }
                ].map((row, i) => (
                  <div key={i} className="metric-row">
                    <div className="metric-row-icon"><i className="fas fa-chart-bar"></i></div>
                    <div className="metric-row-label">{row.label}</div>
                    <div className="metric-row-value">{row.fy24}</div>
                  </div>
                ))}
              </div>

              <div className="cdc-card white">
                <div className="chart-header">
                  <div className="chart-title">Key Ratios</div>
                  <div className="chart-underline"></div>
                </div>
                {[
                  { label: 'ROE', value: '58.6%' },
                  { label: 'ROCE', value: '56.3%' },
                  { label: 'Current Ratio', value: '2.8x' },
                  { label: 'Debt/Equity', value: '0.12x' }
                ].map((row, i) => (
                  <div key={i} className="metric-row">
                    <div className="metric-row-icon"><i className="fas fa-percentage"></i></div>
                    <div className="metric-row-label">{row.label}</div>
                    <div className="metric-row-value">{row.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cdc-card white" style={{ marginTop: '24px' }}>
              <div className="chart-header">
                <div className="chart-title">Balance Sheet Highlights (FY24)</div>
                <div className="chart-underline"></div>
              </div>
              <div className="grid grid-4">
                {[
                  { label: 'Cash & Bank', value: '₹6.16 Cr' },
                  { label: 'Inventory', value: '₹4.2 Cr' },
                  { label: 'Receivables', value: '₹1.8 Cr' },
                  { label: 'Total Assets', value: '₹14.5 Cr' }
                ].map((item, i) => (
                  <div key={i} className="stat-pill" style={{ textAlign: 'center' }}>
                    <div className="stat-pill-label">{item.label}</div>
                    <div className="stat-pill-value">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== STORES SECTION ==================== */}
        {activeSection === 'stores' && (
          <div className="section active">
            <div className="grid grid-3">
              <div className="store-card">
                <div className="store-header">
                  <div className="store-icon"><i className="fas fa-store"></i></div>
                  <div>
                    <div className="store-name">Delhi</div>
                    <div className="store-meta">Connaught Place • Since 2021</div>
                  </div>
                </div>
                <div className="store-revenue">₹11.9 Cr</div>
                <div className="store-label">FY26 YTD Revenue</div>
                <div className="store-bar"><div className="store-bar-fill" style={{ width: '100%' }}></div></div>
                <div className="store-mix">
                  <div className="store-mix-item">
                    <div className="store-mix-value">14.8%</div>
                    <div className="store-mix-label">CM2 Margin</div>
                  </div>
                  <div className="store-mix-item">
                    <div className="store-mix-value">2,450</div>
                    <div className="store-mix-label">Transactions</div>
                  </div>
                </div>
              </div>

              <div className="store-card dark">
                <div className="store-header">
                  <div className="store-icon"><i className="fas fa-store"></i></div>
                  <div>
                    <div className="store-name">Mumbai</div>
                    <div className="store-meta">Bandra • Since 2022</div>
                  </div>
                </div>
                <div className="store-revenue">₹9.2 Cr</div>
                <div className="store-label">FY26 YTD Revenue</div>
                <div className="store-bar"><div className="store-bar-fill" style={{ width: '77%' }}></div></div>
                <div className="store-mix">
                  <div className="store-mix-item">
                    <div className="store-mix-value">17.5%</div>
                    <div className="store-mix-label">CM2 Margin</div>
                  </div>
                  <div className="store-mix-item">
                    <div className="store-mix-value">1,890</div>
                    <div className="store-mix-label">Transactions</div>
                  </div>
                </div>
              </div>

              <div className="store-card darker">
                <div className="store-header">
                  <div className="store-icon"><i className="fas fa-store"></i></div>
                  <div>
                    <div className="store-name">Hyderabad</div>
                    <div className="store-meta">Jubilee Hills • Since 2023</div>
                  </div>
                </div>
                <div className="store-revenue">₹3.5 Cr</div>
                <div className="store-label">FY26 YTD Revenue</div>
                <div className="store-bar"><div className="store-bar-fill" style={{ width: '29%' }}></div></div>
                <div className="store-mix">
                  <div className="store-mix-item">
                    <div className="store-mix-value">18.2%</div>
                    <div className="store-mix-label">CM2 Margin</div>
                  </div>
                  <div className="store-mix-item">
                    <div className="store-mix-value">720</div>
                    <div className="store-mix-label">Transactions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expansion Plans */}
            <div className="cdc-card white" style={{ marginTop: '24px' }}>
              <div className="chart-header">
                <div className="chart-title">Expansion Roadmap</div>
                <div className="chart-underline"></div>
              </div>
              <div className="grid grid-3">
                <div className="stat-pill" style={{ background: 'var(--lime)' }}>
                  <div className="stat-pill-label">Next Store</div>
                  <div className="stat-pill-value">Mumbai Colaba</div>
                </div>
                <div className="stat-pill">
                  <div className="stat-pill-label">2-Year Target</div>
                  <div className="stat-pill-value">15 Stores</div>
                </div>
                <div className="stat-pill">
                  <div className="stat-pill-label">5-Year Vision</div>
                  <div className="stat-pill-value">35 Stores</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== DOCUMENTS SECTION ==================== */}
        {activeSection === 'documents' && (
          <div className="section active">
            <div className="stat-pills" style={{ marginBottom: '24px' }}>
              {Object.keys(DRIVE_FOLDERS).map(f => (
                <div key={f} className="stat-pill" style={{ cursor: 'pointer' }}>
                  <div className="stat-pill-value" style={{ fontSize: '14px' }}>{f.replace(/_/g, ' ')}</div>
                </div>
              ))}
              <button onClick={fetchDriveFiles} className="stat-pill" style={{ cursor: 'pointer', background: 'var(--white)' }}>
                <i className="fas fa-sync-alt"></i> Refresh
              </button>
            </div>

            <div className="grid grid-3">
              {driveFiles.map(file => (
                <div 
                  key={file.id} 
                  className="doc-card" 
                  onClick={() => handleFileView(file)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="doc-card-icon">
                    <i className={`fas fa-file-${file.mimeType?.includes('pdf') ? 'pdf' : file.mimeType?.includes('presentation') ? 'powerpoint' : file.mimeType?.includes('spreadsheet') ? 'excel' : 'alt'}`}></i>
                  </div>
                  <div className="doc-card-info">
                    <div className="doc-card-name">{file.name}</div>
                    <div className="doc-card-meta">{file.folder.replace(/_/g, ' ')}</div>
                    {file.modifiedTime && <div className="doc-card-date">{formatDate(file.modifiedTime)}</div>}
                  </div>
                </div>
              ))}
              {driveFiles.length === 0 && (
                <div className="cdc-card white" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                  <i className="fas fa-folder-open" style={{ fontSize: '48px', color: '#ccc', marginBottom: '16px' }}></i>
                  <p>No documents found. Click Refresh to load files.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== INVESTORS SECTION (Admin) ==================== */}
        {activeSection === 'investors' && isAdmin && (
          <div className="section active">
            <div className="stat-pills">
              <div className="stat-pill">
                <div className="stat-pill-label">Total Sessions</div>
                <div className="stat-pill-value">{sessions.length}</div>
              </div>
              <div className="stat-pill">
                <div className="stat-pill-label">Unique Investors</div>
                <div className="stat-pill-value">{new Set(sessions.map(s => s.email)).size}</div>
              </div>
              <div className="stat-pill">
                <div className="stat-pill-label">Today's Visits</div>
                <div className="stat-pill-value">
                  {sessions.filter(s => {
                    const d = s.createdAt?.toDate?.() || new Date(s.createdAt);
                    return d.toDateString() === new Date().toDateString();
                  }).length}
                </div>
              </div>
            </div>

            <div className="grid grid-2">
              <div className="cdc-card white">
                <div className="chart-header">
                  <div className="chart-title">Recent Sessions</div>
                  <div className="chart-underline"></div>
                </div>
                {sessions.slice(0, 10).map((s, i) => (
                  <div key={i} className="metric-row">
                    <div className="metric-row-icon"><i className="fas fa-user"></i></div>
                    <div className="metric-row-label">
                      <div>{s.email}</div>
                      <small style={{ color: '#666' }}>{formatDateTime(s.createdAt)}</small>
                    </div>
                    <div className="metric-row-value">{s.location?.city || 'Unknown'}</div>
                  </div>
                ))}
              </div>

              <div className="cdc-card white">
                <div className="chart-header">
                  <div className="chart-title">Recent Activity</div>
                  <div className="chart-underline"></div>
                </div>
                {activities.slice(0, 10).map((a, i) => (
                  <div key={i} className="metric-row">
                    <div className="metric-row-icon"><i className="fas fa-eye"></i></div>
                    <div className="metric-row-label">
                      <div>{a.fileName || a.type}</div>
                      <small style={{ color: '#666' }}>{formatDateTime(a.timestamp)}</small>
                    </div>
                    <div className="metric-row-value">{a.folder?.replace(/_/g, ' ') || '-'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== ANALYTICS SECTION (Admin) ==================== */}
        {activeSection === 'analytics' && isAdmin && (
          <div className="section active">
            <div className="stat-pills">
              <div className="stat-pill">
                <div className="stat-pill-label">Data Cards</div>
                <div className="stat-pill-value">{dataCards.length}</div>
              </div>
              <div className="stat-pill">
                <div className="stat-pill-label">Drive Files</div>
                <div className="stat-pill-value">{driveFiles.length}</div>
              </div>
              <div className="stat-pill">
                <div className="stat-pill-label">Total Views</div>
                <div className="stat-pill-value">{activities.filter(a => a.type === 'file_view').length}</div>
              </div>
            </div>

            <div className="cdc-card white">
              <div className="chart-header">
                <div className="chart-title">Data Cards</div>
                <div className="chart-underline"></div>
              </div>
              <div className="grid grid-3">
                {dataCards.map(card => (
                  <div key={card.id} className="stat-pill" style={{ background: 'var(--white)', border: '2px solid var(--black)' }}>
                    <div className="stat-pill-label">{card.category}</div>
                    <div className="stat-pill-value" style={{ fontSize: '14px' }}>{card.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AI Chatbot FAB */}
      <button 
        className={`chat-fab ${chatOpen ? 'hidden' : ''}`} 
        onClick={() => setChatOpen(true)}
      >
        <i className="fas fa-robot"></i>
      </button>

      {/* AI Chatbot */}
      <div className={`chatbot ${chatOpen ? 'active' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-avatar"><i className="fas fa-robot"></i></div>
          <div className="chatbot-info">
            <div className="chatbot-title">CDC AI Assistant</div>
            <div className="chatbot-subtitle">Ask me anything about CDC</div>
          </div>
          <button className="chatbot-close" onClick={() => setChatOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="chatbot-messages" ref={chatRef}>
          {chatMessages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.type}`}>
              <div className="chat-bubble" dangerouslySetInnerHTML={{ __html: msg.text }}></div>
            </div>
          ))}
        </div>

        <div className="chat-suggestions">
          <div className="chat-suggestions-title">Quick Questions</div>
          <button className="chat-btn" onClick={() => askAI('Revenue')}>Revenue</button>
          <button className="chat-btn" onClick={() => askAI('Net profit')}>Profit</button>
          <button className="chat-btn" onClick={() => askAI('Store performance')}>Stores</button>
          <button className="chat-btn" onClick={() => askAI('10 reasons to invest')}>Why Invest?</button>
        </div>

        <div className="chatbot-input">
          <input 
            value={chatInput} 
            onChange={(e) => setChatInput(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && sendChat()} 
            placeholder="Ask about CDC..." 
          />
          <button onClick={sendChat}><i className="fas fa-paper-plane"></i></button>
        </div>
      </div>

      {/* Modals */}
      <OCRReaderModal 
        isOpen={ocrModalOpen} 
        onClose={() => setOcrModalOpen(false)}
        onDataExtracted={(data) => console.log('OCR Data:', data)}
      />

      <DataCardsEditor
        isOpen={dataCardsEditorOpen}
        onClose={() => setDataCardsEditorOpen(false)}
        dataCards={dataCards}
        onSave={saveDataCard}
        onUpdate={updateDataCard}
        onDelete={deleteDataCard}
      />
    </div>
  );
};

// ==================== MAIN APP ====================
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) return <LoginPage />;

  return <Dashboard user={user} isAdmin={ADMIN_EMAILS.includes(user.email?.toLowerCase())} />;
};

export default App;

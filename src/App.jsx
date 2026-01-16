import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
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

// ==================== CHART DATA ====================
const revenueData = [
  { year: 'FY21', revenue: 1.2, growth: 0 },
  { year: 'FY22', revenue: 3.8, growth: 217 },
  { year: 'FY23', revenue: 8.5, growth: 124 },
  { year: 'FY24', revenue: 18.2, growth: 114 },
  { year: 'FY25E', revenue: 45, growth: 147 },
];

const channelData = [
  { name: 'Online', value: 41.9, color: '#C0E529' },
  { name: 'Retail', value: 24.6, color: '#4A5D23' },
];

const storePerformanceData = [
  { store: 'Delhi CP', revenue: 11.9, cm2: 14.8, transactions: 2450 },
  { store: 'Mumbai Bandra', revenue: 9.2, cm2: 17.5, transactions: 1890 },
  { store: 'Hyderabad JH', revenue: 3.5, cm2: 18.2, transactions: 720 },
];

const monthlyRevenueData = [
  { month: 'Apr', fy24: 1.2, fy25: 3.8 },
  { month: 'May', fy24: 1.4, fy25: 4.2 },
  { month: 'Jun', fy24: 1.1, fy25: 4.8 },
  { month: 'Jul', fy24: 1.5, fy25: 5.1 },
  { month: 'Aug', fy24: 1.8, fy25: 5.9 },
  { month: 'Sep', fy24: 2.1, fy25: 6.4 },
  { month: 'Oct', fy24: 2.4, fy25: 7.2 },
  { month: 'Nov', fy24: 2.2, fy25: 7.8 },
  { month: 'Dec', fy24: 2.5, fy25: 8.5 },
];

const profitabilityData = [
  { metric: 'Gross Margin', value: 45, benchmark: 35 },
  { metric: 'Operating Margin', value: 35, benchmark: 15 },
  { metric: 'Net Margin', value: 34, benchmark: 10 },
];

const categoryData = [
  { name: 'Sneakers', value: 84, color: '#C0E529' },
  { name: 'Streetwear', value: 12, color: '#6B8E23' },
  { name: 'Accessories', value: 4, color: '#3D4A2B' },
];

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

// Chart color palette
const COLORS = ['#C0E529', '#6B8E23', '#4A5D23', '#3D4A2B', '#000000'];

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
          {!showAddForm && (
            <button className="btn-primary" onClick={() => setShowAddForm(true)} style={{ marginBottom: '20px' }}>
              <i className="fas fa-plus"></i> Add New Card
            </button>
          )}

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

// ==================== USER MANAGEMENT MODAL (Admin) ====================
const UserManagementModal = ({ isOpen, onClose, sessions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  if (!isOpen) return null;

  const uniqueUsers = sessions.reduce((acc, session) => {
    if (!acc[session.email]) {
      acc[session.email] = {
        email: session.email,
        displayName: session.displayName || session.email?.split('@')[0],
        sessions: [],
        lastLogin: session.createdAt,
        totalSessions: 0
      };
    }
    acc[session.email].sessions.push(session);
    acc[session.email].totalSessions++;
    return acc;
  }, {});

  let userList = Object.values(uniqueUsers);

  if (searchTerm) {
    userList = userList.filter(u =>
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortBy === 'recent') {
    userList.sort((a, b) => {
      const dateA = a.lastLogin?.toDate?.() || new Date(a.lastLogin);
      const dateB = b.lastLogin?.toDate?.() || new Date(b.lastLogin);
      return dateB - dateA;
    });
  } else if (sortBy === 'sessions') {
    userList.sort((a, b) => b.totalSessions - a.totalSessions);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content wide" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2><i className="fas fa-users"></i> User Management</h2>
          <button className="modal-close" onClick={onClose}><i className="fas fa-times"></i></button>
        </div>

        <div className="modal-body">
          <div className="user-filters" style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <div className="input-wrapper" style={{ flex: 1 }}>
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '12px 16px', border: '2px solid var(--black)', borderRadius: '50px' }}>
              <option value="recent">Most Recent</option>
              <option value="sessions">Most Sessions</option>
            </select>
          </div>

          <div className="user-list">
            {userList.map((user, i) => (
              <div key={i} className="user-card cdc-card white" style={{ marginBottom: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="user-avatar">
                      <i className="fas fa-user"></i>
                    </div>
                    <div>
                      <div style={{ fontWeight: '700' }}>{user.displayName}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{user.email}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="stat-pill" style={{ display: 'inline-block' }}>
                      <div className="stat-pill-value" style={{ fontSize: '14px' }}>{user.totalSessions} sessions</div>
                    </div>
                    <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
                      Last: {formatDateTime(user.lastLogin)}
                    </div>
                  </div>
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

// ==================== DATA REPOSITORY MODAL ====================
const DataRepositoryModal = ({ isOpen, onClose, driveFiles, onFileView }) => {
  const [activeFolder, setActiveFolder] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const folders = ['ALL', ...Object.keys(DRIVE_FOLDERS)];

  let filteredFiles = driveFiles;
  if (activeFolder !== 'ALL') {
    filteredFiles = filteredFiles.filter(f => f.folder === activeFolder);
  }
  if (searchTerm) {
    filteredFiles = filteredFiles.filter(f =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content wide" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2><i className="fas fa-database"></i> Data Repository</h2>
          <button className="modal-close" onClick={onClose}><i className="fas fa-times"></i></button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <div className="input-wrapper" style={{ flex: 1 }}>
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="folder-tabs" style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {folders.map(folder => (
              <button
                key={folder}
                onClick={() => setActiveFolder(folder)}
                className={`stat-pill ${activeFolder === folder ? '' : 'inactive'}`}
                style={{
                  cursor: 'pointer',
                  background: activeFolder === folder ? 'var(--lime)' : 'var(--white)',
                  border: '2px solid var(--black)'
                }}
              >
                <div className="stat-pill-value" style={{ fontSize: '12px' }}>
                  {folder.replace(/_/g, ' ')}
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-3">
            {filteredFiles.map(file => (
              <div
                key={file.id}
                className="doc-card"
                onClick={() => onFileView(file)}
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
          </div>

          {filteredFiles.length === 0 && (
            <div className="cdc-card white" style={{ textAlign: 'center', padding: '40px' }}>
              <i className="fas fa-folder-open" style={{ fontSize: '48px', color: '#ccc', marginBottom: '16px' }}></i>
              <p>No documents found</p>
            </div>
          )}
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
  const [dataCardsEditorOpen, setDataCardsEditorOpen] = useState(false);
  const [userManagementOpen, setUserManagementOpen] = useState(false);
  const [dataRepositoryOpen, setDataRepositoryOpen] = useState(false);

  // Load Data
  useEffect(() => {
    const loadData = async () => {
      try {
        const location = await getLocationData();
        saveSession(user.uid, {
          email: user.email,
          displayName: user.displayName,
          location,
          startTime: new Date().toISOString()
        }).catch(console.error);

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

  // Navigation items
  const navItems = [
    { id: 'overview', label: 'Overview', icon: 'fa-home' },
    { id: 'financials', label: 'Financials', icon: 'fa-chart-line' },
    { id: 'stores', label: 'Stores', icon: 'fa-store' },
    { id: 'documents', label: 'Documents', icon: 'fa-folder' },
    ...(isAdmin ? [
      { id: 'admin', label: 'Admin Panel', icon: 'fa-cog' },
      { id: 'analytics', label: 'Analytics', icon: 'fa-chart-bar' }
    ] : [])
  ];

  // Session analytics for admin
  const getSessionStats = () => {
    const today = new Date();
    const todaySessions = sessions.filter(s => {
      const d = s.createdAt?.toDate?.() || new Date(s.createdAt);
      return d.toDateString() === today.toDateString();
    });

    const thisWeek = sessions.filter(s => {
      const d = s.createdAt?.toDate?.() || new Date(s.createdAt);
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return d >= weekAgo;
    });

    const uniqueEmails = new Set(sessions.map(s => s.email));
    const locationCounts = sessions.reduce((acc, s) => {
      const city = s.location?.city || 'Unknown';
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    return {
      total: sessions.length,
      today: todaySessions.length,
      thisWeek: thisWeek.length,
      unique: uniqueEmails.size,
      topLocations: Object.entries(locationCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
    };
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const sessionStats = isAdmin ? getSessionStats() : null;

  return (
    <div className="app">
      {/* Mobile Header */}
      <div className="mobile-header">
        <div className="mobile-logo">CREPDOG CREW</div>
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

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
            <div style={{ marginBottom: '12px' }}>
              <button className="sidebar-btn" onClick={() => setDataCardsEditorOpen(true)}>
                <i className="fas fa-th-large"></i> Edit Cards
              </button>
              <button className="sidebar-btn" onClick={() => setUserManagementOpen(true)}>
                <i className="fas fa-users"></i> Users
              </button>
              <button className="sidebar-btn" onClick={() => setDataRepositoryOpen(true)}>
                <i className="fas fa-database"></i> Repository
              </button>
            </div>
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

            {/* Revenue Growth Chart */}
            <div className="cdc-card white" style={{ marginBottom: '24px' }}>
              <div className="chart-header">
                <div className="chart-title">Revenue Growth Trajectory</div>
                <div className="chart-underline"></div>
              </div>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value} Cr`} />
                    <Bar dataKey="revenue" fill="#C0E529" stroke="#000" strokeWidth={2} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Problem Cards */}
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
              {/* Channel Mix Chart */}
              <div className="cdc-card white">
                <div className="chart-header">
                  <div className="chart-title">Channel Revenue Mix (FY26 YTD)</div>
                  <div className="chart-underline"></div>
                </div>
                <div style={{ height: '250px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ₹${value}Cr`}
                      >
                        {channelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="#000" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `₹${value} Cr`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Store Performance Summary */}
              <div className="cdc-card white">
                <div className="chart-header">
                  <div className="chart-title">Store Performance</div>
                  <div className="chart-underline"></div>
                </div>
                {storePerformanceData.map((store, i) => (
                  <div key={i} className="metric-row">
                    <div className="metric-row-icon"><i className="fas fa-store"></i></div>
                    <div className="metric-row-label">{store.store}</div>
                    <div className="metric-row-value">₹{store.revenue} Cr</div>
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

            {/* Monthly Revenue Comparison */}
            <div className="cdc-card white" style={{ marginBottom: '24px' }}>
              <div className="chart-header">
                <div className="chart-title">Monthly Revenue Comparison (₹ Cr)</div>
                <div className="chart-underline"></div>
              </div>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value} Cr`} />
                    <Legend />
                    <Area type="monotone" dataKey="fy24" stackId="1" stroke="#6B8E23" fill="#6B8E23" name="FY24" />
                    <Area type="monotone" dataKey="fy25" stackId="2" stroke="#C0E529" fill="#C0E529" name="FY25" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-2">
              {/* P&L Highlights */}
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

              {/* Margin Comparison Chart */}
              <div className="cdc-card white">
                <div className="chart-header">
                  <div className="chart-title">Margin Analysis vs Industry</div>
                  <div className="chart-underline"></div>
                </div>
                <div style={{ height: '220px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={profitabilityData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 50]} />
                      <YAxis dataKey="metric" type="category" width={100} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Bar dataKey="value" fill="#C0E529" name="CDC" stroke="#000" strokeWidth={2} />
                      <Bar dataKey="benchmark" fill="#E5E5E5" name="Industry Avg" stroke="#000" strokeWidth={1} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Key Ratios & Balance Sheet */}
            <div className="grid grid-2" style={{ marginTop: '24px' }}>
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

              <div className="cdc-card white">
                <div className="chart-header">
                  <div className="chart-title">Balance Sheet (FY24)</div>
                  <div className="chart-underline"></div>
                </div>
                {[
                  { label: 'Cash & Bank', value: '₹6.16 Cr' },
                  { label: 'Inventory', value: '₹4.2 Cr' },
                  { label: 'Receivables', value: '₹1.8 Cr' },
                  { label: 'Total Assets', value: '₹14.5 Cr' }
                ].map((row, i) => (
                  <div key={i} className="metric-row">
                    <div className="metric-row-icon"><i className="fas fa-wallet"></i></div>
                    <div className="metric-row-label">{row.label}</div>
                    <div className="metric-row-value">{row.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== STORES SECTION ==================== */}
        {activeSection === 'stores' && (
          <div className="section active">
            {/* Store Revenue Chart */}
            <div className="cdc-card white" style={{ marginBottom: '24px' }}>
              <div className="chart-header">
                <div className="chart-title">Store Revenue & CM2 Margins (FY26 YTD)</div>
                <div className="chart-underline"></div>
              </div>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={storePerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="store" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" fill="#C0E529" name="Revenue (₹ Cr)" stroke="#000" strokeWidth={2} />
                    <Bar yAxisId="right" dataKey="cm2" fill="#6B8E23" name="CM2 %" stroke="#000" strokeWidth={2} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-3">
              <div className="store-card">
                <div className="store-header">
                  <div className="store-icon"><i className="fas fa-store"></i></div>
                  <div>
                    <div className="store-name">Delhi</div>
                    <div className="store-meta">Connaught Place | Since 2021</div>
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
                    <div className="store-meta">Bandra | Since 2022</div>
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
                    <div className="store-meta">Jubilee Hills | Since 2023</div>
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

            {/* Category Mix */}
            <div className="cdc-card white" style={{ marginTop: '24px' }}>
              <div className="chart-header">
                <div className="chart-title">Product Category Mix</div>
                <div className="chart-underline"></div>
              </div>
              <div style={{ height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#000" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
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

        {/* ==================== ADMIN PANEL SECTION ==================== */}
        {activeSection === 'admin' && isAdmin && (
          <div className="section active">
            <div className="stat-pills">
              <div className="stat-pill">
                <div className="stat-pill-label">Total Sessions</div>
                <div className="stat-pill-value">{sessionStats.total}</div>
              </div>
              <div className="stat-pill">
                <div className="stat-pill-label">Today</div>
                <div className="stat-pill-value">{sessionStats.today}</div>
              </div>
              <div className="stat-pill">
                <div className="stat-pill-label">This Week</div>
                <div className="stat-pill-value">{sessionStats.thisWeek}</div>
              </div>
              <div className="stat-pill">
                <div className="stat-pill-label">Unique Users</div>
                <div className="stat-pill-value">{sessionStats.unique}</div>
              </div>
            </div>

            {/* Admin Quick Actions */}
            <div className="cdc-card white" style={{ marginBottom: '24px' }}>
              <div className="chart-header">
                <div className="chart-title">Admin Quick Actions</div>
                <div className="chart-underline"></div>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={() => setDataCardsEditorOpen(true)}>
                  <i className="fas fa-th-large"></i> Edit Data Cards
                </button>
                <button className="btn-primary" onClick={() => setUserManagementOpen(true)}>
                  <i className="fas fa-users"></i> Manage Users
                </button>
                <button className="btn-primary" onClick={() => setDataRepositoryOpen(true)}>
                  <i className="fas fa-database"></i> Data Repository
                </button>
                <button className="btn-secondary" onClick={fetchDriveFiles}>
                  <i className="fas fa-sync-alt"></i> Refresh Data
                </button>
              </div>
            </div>

            <div className="grid grid-2">
              {/* Recent Sessions */}
              <div className="cdc-card white">
                <div className="chart-header">
                  <div className="chart-title">Recent Login Sessions</div>
                  <div className="chart-underline"></div>
                </div>
                {sessions.slice(0, 8).map((s, i) => (
                  <div key={i} className="metric-row">
                    <div className="metric-row-icon"><i className="fas fa-user"></i></div>
                    <div className="metric-row-label">
                      <div style={{ fontWeight: '600' }}>{s.email}</div>
                      <small style={{ color: '#666' }}>{formatDateTime(s.createdAt)}</small>
                    </div>
                    <div className="metric-row-value" style={{ fontSize: '12px' }}>{s.location?.city || 'Unknown'}</div>
                  </div>
                ))}
              </div>

              {/* Top Locations */}
              <div className="cdc-card white">
                <div className="chart-header">
                  <div className="chart-title">Login Locations</div>
                  <div className="chart-underline"></div>
                </div>
                {sessionStats.topLocations.map(([city, count], i) => (
                  <div key={i} className="metric-row">
                    <div className="metric-row-icon"><i className="fas fa-map-marker-alt"></i></div>
                    <div className="metric-row-label">{city}</div>
                    <div className="metric-row-value">{count} sessions</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="cdc-card white" style={{ marginTop: '24px' }}>
              <div className="chart-header">
                <div className="chart-title">Recent Document Activity</div>
                <div className="chart-underline"></div>
              </div>
              <div className="grid grid-2">
                {activities.slice(0, 10).map((a, i) => (
                  <div key={i} className="metric-row">
                    <div className="metric-row-icon"><i className="fas fa-eye"></i></div>
                    <div className="metric-row-label">
                      <div style={{ fontWeight: '600' }}>{a.fileName || a.type}</div>
                      <small style={{ color: '#666' }}>{formatDateTime(a.timestamp)}</small>
                    </div>
                    <div className="metric-row-value" style={{ fontSize: '11px' }}>{a.folder?.replace(/_/g, ' ') || '-'}</div>
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

            {/* Session Trends - could be enhanced with real data */}
            <div className="cdc-card white" style={{ marginBottom: '24px' }}>
              <div className="chart-header">
                <div className="chart-title">Engagement Overview</div>
                <div className="chart-underline"></div>
              </div>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { day: 'Mon', sessions: Math.floor(Math.random() * 10) + 5, views: Math.floor(Math.random() * 20) + 10 },
                    { day: 'Tue', sessions: Math.floor(Math.random() * 10) + 5, views: Math.floor(Math.random() * 20) + 10 },
                    { day: 'Wed', sessions: Math.floor(Math.random() * 10) + 5, views: Math.floor(Math.random() * 20) + 10 },
                    { day: 'Thu', sessions: Math.floor(Math.random() * 10) + 5, views: Math.floor(Math.random() * 20) + 10 },
                    { day: 'Fri', sessions: Math.floor(Math.random() * 10) + 5, views: Math.floor(Math.random() * 20) + 10 },
                    { day: 'Sat', sessions: Math.floor(Math.random() * 5) + 2, views: Math.floor(Math.random() * 10) + 5 },
                    { day: 'Sun', sessions: Math.floor(Math.random() * 5) + 2, views: Math.floor(Math.random() * 10) + 5 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sessions" stroke="#C0E529" strokeWidth={3} name="Sessions" />
                    <Line type="monotone" dataKey="views" stroke="#6B8E23" strokeWidth={3} name="Document Views" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Data Cards Grid */}
            <div className="cdc-card white">
              <div className="chart-header">
                <div className="chart-title">Data Cards Overview</div>
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

      {/* Modals */}
      <DataCardsEditor
        isOpen={dataCardsEditorOpen}
        onClose={() => setDataCardsEditorOpen(false)}
        dataCards={dataCards}
        onSave={saveDataCard}
        onUpdate={updateDataCard}
        onDelete={deleteDataCard}
      />

      <UserManagementModal
        isOpen={userManagementOpen}
        onClose={() => setUserManagementOpen(false)}
        sessions={sessions}
      />

      <DataRepositoryModal
        isOpen={dataRepositoryOpen}
        onClose={() => setDataRepositoryOpen(false)}
        driveFiles={driveFiles}
        onFileView={handleFileView}
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

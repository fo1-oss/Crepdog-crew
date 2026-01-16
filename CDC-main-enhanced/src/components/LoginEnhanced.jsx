import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import './LoginEnhanced.css';

function LoginEnhanced() {
  const { login, register, loading } = useAuth();
  const [currentView, setCurrentView] = useState('landing');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    investorType: '',
    investmentSize: '',
  });

  const transitionTo = (view) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView(view);
      setIsTransitioning(false);
      setError(null);
    }, 300);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setError(null);

    const result = await login(loginData.email, loginData.password);
    if (!result.success) {
      setError(result.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setError(null);
    setSuccess(null);

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (registerData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    const result = await register({
      email: registerData.email,
      password: registerData.password,
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      company: registerData.company || undefined,
      phone: registerData.phone || undefined,
      investorType: registerData.investorType || undefined,
      investmentSize: registerData.investmentSize || undefined,
    });

    if (result.success) {
      setSuccess('Registration successful! Please wait for admin approval.');
      transitionTo('login');
      setRegisterData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        company: '',
        phone: '',
        investorType: '',
        investmentSize: '',
      });
    } else {
      setError(result.message);
    }
  };

  // Landing Page
  const renderLanding = () => (
    <div className="le-landing-page">
      <div className="le-grid-overlay">
        {[...Array(10)].map((_, i) => (
          <div key={`v${i}`} className="le-grid-line-v" style={{ left: `${i * 10 + 5}%` }} />
        ))}
      </div>

      <div className="le-floating-elements">
        <div className="le-floating-sneaker" style={{ left: '10%', top: '20%', animationDelay: '0s' }}>👟</div>
        <div className="le-floating-sneaker" style={{ left: '85%', top: '15%', animationDelay: '0.5s' }}>👟</div>
        <div className="le-floating-sneaker" style={{ left: '15%', top: '70%', animationDelay: '1s' }}>👟</div>
        <div className="le-floating-sneaker" style={{ left: '80%', top: '75%', animationDelay: '1.5s' }}>👟</div>
      </div>

      <div className="le-landing-content">
        <div className="le-landing-logo">
          <div className="le-logo-main">
            <span className="le-logo-c">C</span>
            <span className="le-logo-d">D</span>
            <span className="le-logo-c2">C</span>
          </div>
          <div className="le-logo-full">CREPDOG CREW</div>
          <div className="le-logo-badge">INVESTOR DATA ROOM</div>
        </div>

        <div className="le-hero-text">
          <h1 className="le-hero-title">
            <span>Premium Sneakers</span>
            <span className="le-hero-accent">Streetwear Culture</span>
          </h1>
          <p className="le-hero-tagline">India's #1 Authenticated Sneaker Destination</p>
        </div>

        <div className="le-landing-stats">
          <div className="le-stat-card">
            <div className="le-stat-icon">📈</div>
            <div className="le-stat-content">
              <div className="le-stat-value">₹18.2 Cr</div>
              <div className="le-stat-label">Revenue FY24</div>
            </div>
          </div>
          <div className="le-stat-card">
            <div className="le-stat-icon">🚀</div>
            <div className="le-stat-content">
              <div className="le-stat-value">114%</div>
              <div className="le-stat-label">YoY Growth</div>
            </div>
          </div>
          <div className="le-stat-card">
            <div className="le-stat-icon">💎</div>
            <div className="le-stat-content">
              <div className="le-stat-value">62:1</div>
              <div className="le-stat-label">LTV:CAC</div>
            </div>
          </div>
        </div>

        <div className="le-landing-cta">
          <button type="button" className="le-cta-primary" onClick={() => transitionTo('login')}>
            <span>Access Data Room</span>
            <span>→</span>
          </button>
          <button type="button" className="le-cta-secondary" onClick={() => transitionTo('register')}>
            <span>Request Access</span>
          </button>
        </div>

        <div className="le-store-locations">
          <div className="le-location-badge">📍 Delhi</div>
          <div className="le-location-badge">📍 Mumbai</div>
          <div className="le-location-badge">📍 Hyderabad</div>
        </div>
      </div>

      <svg className="le-wave-bottom" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z" fill="#000" />
      </svg>
    </div>
  );

  // Login Page
  const renderLogin = () => (
    <div className="le-auth-page">
      <div className="le-auth-left">
        <div className="le-auth-branding">
          <button type="button" className="le-brand-logo" onClick={() => transitionTo('landing')}>
            <span>CDC</span>
          </button>
          <h2>Welcome Back</h2>
          <p>Sign in to access the investor data room and explore Crepdog Crew's growth story.</p>
          
          <div className="le-brand-features">
            <div className="le-feature-item">
              <div className="le-feature-icon">🔐</div>
              <div className="le-feature-text">
                <strong>Secure Access</strong>
                <span>Enterprise-grade security</span>
              </div>
            </div>
            <div className="le-feature-item">
              <div className="le-feature-icon">📊</div>
              <div className="le-feature-text">
                <strong>Real-time Data</strong>
                <span>Live financial metrics</span>
              </div>
            </div>
            <div className="le-feature-item">
              <div className="le-feature-icon">📁</div>
              <div className="le-feature-text">
                <strong>Full Documents</strong>
                <span>Pitch deck & financials</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="le-auth-right">
        <div className="le-auth-form-container">
          <div className="le-form-header">
            <h3>Sign In</h3>
            <p>Enter your credentials to continue</p>
          </div>

          {error && <div className="le-auth-error">{error}</div>}
          {success && <div className="le-auth-success">{success}</div>}

          <form onSubmit={handleLoginSubmit} className="le-auth-form">
            <div className="le-input-group">
              <label htmlFor="login-email">Email Address</label>
              <div className="le-input-wrapper">
                <span className="le-input-icon">✉️</span>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  autoComplete="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="investor@company.com"
                  required
                />
              </div>
            </div>

            <div className="le-input-group">
              <label htmlFor="login-password">Password</label>
              <div className="le-input-wrapper">
                <span className="le-input-icon">🔒</span>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  autoComplete="current-password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="le-submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="le-btn-spinner"></span>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          <div className="le-auth-footer">
            <p>Don't have an account?</p>
            <button type="button" className="le-switch-auth-btn" onClick={() => transitionTo('register')}>
              Request Access
            </button>
          </div>

          <button type="button" className="le-back-btn" onClick={() => transitionTo('landing')}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  // Register Page
  const renderRegister = () => (
    <div className="le-auth-page">
      <div className="le-auth-left">
        <div className="le-auth-branding">
          <button type="button" className="le-brand-logo" onClick={() => transitionTo('landing')}>
            <span>CDC</span>
          </button>
          <h2>Request Access</h2>
          <p>Join our exclusive investor community and get access to comprehensive business insights.</p>
          
          <div className="le-brand-features">
            <div className="le-feature-item">
              <div className="le-feature-icon">✨</div>
              <div className="le-feature-text">
                <strong>Exclusive Access</strong>
                <span>For verified investors only</span>
              </div>
            </div>
            <div className="le-feature-item">
              <div className="le-feature-icon">🤝</div>
              <div className="le-feature-text">
                <strong>Direct Contact</strong>
                <span>Connect with founders</span>
              </div>
            </div>
            <div className="le-feature-item">
              <div className="le-feature-icon">📈</div>
              <div className="le-feature-text">
                <strong>Growth Story</strong>
                <span>114% YoY growth</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="le-auth-right">
        <div className="le-auth-form-container le-register">
          <div className="le-form-header">
            <h3>Create Account</h3>
            <p>Fill in your details to request access</p>
          </div>

          {error && <div className="le-auth-error">{error}</div>}

          <form onSubmit={handleRegisterSubmit} className="le-auth-form">
            <div className="le-form-row">
              <div className="le-input-group">
                <label htmlFor="reg-firstName">First Name *</label>
                <input
                  type="text"
                  id="reg-firstName"
                  name="firstName"
                  autoComplete="given-name"
                  value={registerData.firstName}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, firstName: e.target.value }))}
                  required
                  placeholder="John"
                />
              </div>
              <div className="le-input-group">
                <label htmlFor="reg-lastName">Last Name *</label>
                <input
                  type="text"
                  id="reg-lastName"
                  name="lastName"
                  autoComplete="family-name"
                  value={registerData.lastName}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, lastName: e.target.value }))}
                  required
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="le-input-group">
              <label htmlFor="reg-email">Email *</label>
              <input
                type="email"
                id="reg-email"
                name="email"
                autoComplete="email"
                value={registerData.email}
                onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                required
                placeholder="investor@company.com"
              />
            </div>

            <div className="le-input-group">
              <label htmlFor="reg-company">Company / Fund</label>
              <input
                type="text"
                id="reg-company"
                name="company"
                autoComplete="organization"
                value={registerData.company}
                onChange={(e) => setRegisterData(prev => ({ ...prev, company: e.target.value }))}
                placeholder="Your company or fund name"
              />
            </div>

            <div className="le-form-row">
              <div className="le-input-group">
                <label htmlFor="reg-investorType">Investor Type</label>
                <select
                  id="reg-investorType"
                  name="investorType"
                  value={registerData.investorType}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, investorType: e.target.value }))}
                >
                  <option value="">Select type</option>
                  <option value="Angel Investor">Angel Investor</option>
                  <option value="Venture Capital">Venture Capital</option>
                  <option value="Family Office">Family Office</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="le-input-group">
                <label htmlFor="reg-investmentSize">Investment Range</label>
                <select
                  id="reg-investmentSize"
                  name="investmentSize"
                  value={registerData.investmentSize}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, investmentSize: e.target.value }))}
                >
                  <option value="">Select range</option>
                  <option value="< ₹25 Lakh">{'< ₹25 Lakh'}</option>
                  <option value="₹25 Lakh - ₹1 Cr">₹25 Lakh - ₹1 Cr</option>
                  <option value="₹1 Cr - ₹5 Cr">₹1 Cr - ₹5 Cr</option>
                  <option value="₹5 Cr+">₹5 Cr+</option>
                </select>
              </div>
            </div>

            <div className="le-form-row">
              <div className="le-input-group">
                <label htmlFor="reg-password">Password *</label>
                <input
                  type="password"
                  id="reg-password"
                  name="password"
                  autoComplete="new-password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                  required
                  minLength={8}
                  placeholder="Min. 8 characters"
                />
              </div>
              <div className="le-input-group">
                <label htmlFor="reg-confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="reg-confirmPassword"
                  name="confirmPassword"
                  autoComplete="new-password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                  placeholder="Re-enter password"
                />
              </div>
            </div>

            <button type="submit" className="le-submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="le-btn-spinner"></span>
                  Submitting...
                </>
              ) : (
                <>
                  Request Access
                  <span>✈️</span>
                </>
              )}
            </button>
          </form>

          <div className="le-auth-footer">
            <p>Already have an account?</p>
            <button type="button" className="le-switch-auth-btn" onClick={() => transitionTo('login')}>
              Sign In
            </button>
          </div>

          <button type="button" className="le-back-btn" onClick={() => transitionTo('landing')}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`le-wrapper ${isTransitioning ? 'le-transitioning' : ''}`}>
      {currentView === 'landing' && renderLanding()}
      {currentView === 'login' && renderLogin()}
      {currentView === 'register' && renderRegister()}
    </div>
  );
}

export default LoginEnhanced;

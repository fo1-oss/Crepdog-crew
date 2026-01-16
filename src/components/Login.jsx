import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

// Google Logo SVG Component
const GoogleLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

function Login() {
  const { login, loginGoogle, register, loading } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await login(loginData.email, loginData.password);
    if (!result.success) {
      setError(result.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setGoogleLoading(true);
    
    const result = await loginGoogle();
    if (!result.success) {
      setError(result.message);
    }
    
    setGoogleLoading(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
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
      setSuccess('Registration successful! You can now sign in.');
      setIsRegistering(false);
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

  return (
    <div className="login-overlay">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <span className="logo-text">CDC</span>
            <span className="logo-subtext">INVESTOR DATA ROOM</span>
          </div>
          <p className="login-tagline">India's Premium Sneaker & Lifestyle Destination</p>
        </div>

        {error && <div className="login-error"><i className="fas fa-exclamation-circle"></i> {error}</div>}
        {success && <div className="login-success"><i className="fas fa-check-circle"></i> {success}</div>}

        {!isRegistering ? (
          <form onSubmit={handleLoginSubmit} className="login-form">
            <h2>Welcome Back</h2>
            <p className="form-subtitle">Sign in to access the data room</p>

            {/* Google Sign-in Button */}
            <button 
              type="button" 
              className="google-btn" 
              onClick={handleGoogleLogin}
              disabled={loading || googleLoading}
            >
              {googleLoading ? (
                <>
                  <span className="spinner small"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <GoogleLogo />
                  Continue with Google
                </>
              )}
            </button>

            <div className="divider">
              <span>or sign in with email</span>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  placeholder="investor@company.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <i className="fas fa-lock"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="Enter your password"
                  required
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading || googleLoading}>
              {loading ? (
                <>
                  <span className="spinner small"></span>
                  Signing In...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  Sign In
                </>
              )}
            </button>

            <div className="login-footer">
              <p>Don't have an account?</p>
              <button type="button" className="switch-btn" onClick={() => setIsRegistering(true)}>
                Request Access
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="login-form register-form">
            <h2>Request Access</h2>
            <p className="form-subtitle">Fill in your details to request data room access</p>

            {/* Google Sign-up Button */}
            <button 
              type="button" 
              className="google-btn" 
              onClick={handleGoogleLogin}
              disabled={loading || googleLoading}
            >
              {googleLoading ? (
                <>
                  <span className="spinner small"></span>
                  Signing up...
                </>
              ) : (
                <>
                  <GoogleLogo />
                  Continue with Google
                </>
              )}
            </button>

            <div className="divider">
              <span>or register with email</span>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  value={registerData.firstName}
                  onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  value={registerData.lastName}
                  onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-email">Email *</label>
              <div className="input-wrapper">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  id="reg-email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  placeholder="investor@company.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="company">Company / Fund</label>
              <div className="input-wrapper">
                <i className="fas fa-building"></i>
                <input
                  type="text"
                  id="company"
                  value={registerData.company}
                  onChange={(e) => setRegisterData({ ...registerData, company: e.target.value })}
                  placeholder="Your company or fund name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="investorType">Investor Type</label>
                <select
                  id="investorType"
                  value={registerData.investorType}
                  onChange={(e) => setRegisterData({ ...registerData, investorType: e.target.value })}
                >
                  <option value="">Select type</option>
                  <option value="Angel Investor">Angel Investor</option>
                  <option value="Venture Capital">Venture Capital</option>
                  <option value="Family Office">Family Office</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="investmentSize">Investment Range</label>
                <select
                  id="investmentSize"
                  value={registerData.investmentSize}
                  onChange={(e) => setRegisterData({ ...registerData, investmentSize: e.target.value })}
                >
                  <option value="">Select range</option>
                  <option value="< ₹25 Lakh">{'< ₹25 Lakh'}</option>
                  <option value="₹25 Lakh - ₹1 Cr">₹25 Lakh - ₹1 Cr</option>
                  <option value="₹1 Cr - ₹5 Cr">₹1 Cr - ₹5 Cr</option>
                  <option value="₹5 Cr+">₹5 Cr+</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="reg-password">Password *</label>
                <div className="input-wrapper">
                  <i className="fas fa-lock"></i>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="reg-password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    placeholder="Min. 8 characters"
                    required
                    minLength={8}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <div className="input-wrapper">
                  <i className="fas fa-lock"></i>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    placeholder="Re-enter password"
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner small"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus"></i>
                  Request Access
                </>
              )}
            </button>

            <div className="login-footer">
              <p>Already have an account?</p>
              <button type="button" className="switch-btn" onClick={() => setIsRegistering(false)}>
                Sign In
              </button>
            </div>
          </form>
        )}

        <div className="login-info">
          <p>By signing in, you agree to keep all information confidential.</p>
          <p>This data room is for authorized investors only.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;

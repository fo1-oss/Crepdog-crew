import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name || formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password || formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        const result = await register({
            name: formData.name,
            email: formData.email,
            company: formData.company || undefined,
            password: formData.password
        });

        if (result.success) {
            // Registration successful, redirect to login
            navigate('/login', {
                state: { message: 'Account created successfully! Please login.' }
            });
        } else {
            if (result.errors) {
                const errorObj = {};
                result.errors.forEach(err => {
                    errorObj[err.field] = err.message;
                });
                setErrors(errorObj);
            } else {
                setErrors({ general: result.message });
            }
        }

        setLoading(false);
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <div className="register-header">
                    <h1>Crepdog Crew</h1>
                    <p>Investor Data Room</p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    <h2>Create Account</h2>
                    <p className="register-subtitle">Join the CDC investor community</p>

                    {errors.general && (
                        <div className="error-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {errors.general}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                        />
                        {errors.name && <span className="field-error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="investor@example.com"
                            required
                        />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="company">Company / Fund (Optional)</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Acme Ventures"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password *</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Minimum 8 characters"
                            required
                        />
                        {errors.password && <span className="field-error">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password *</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter your password"
                            required
                        />
                        {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                    </div>

                    <button type="submit" className="register-btn" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Creating Account...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-user-plus"></i>
                                Create Account
                            </>
                        )}
                    </button>

                    <p className="login-link">
                        Already have an account? <Link to="/login">Sign in here</Link>
                    </p>
                </form>

                <div className="register-footer">
                    <p>© 2026 Crepdog Crew. All rights reserved.</p>
                </div>
            </div>

            <style jsx>{`
        .register-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
          padding: 20px;
        }

        .register-box {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(192, 229, 41, 0.2);
          border-radius: 20px;
          padding: 40px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          margin: 40px 0;
        }

        .register-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .register-header h1 {
          color: #C0E529;
          font-size: 32px;
          margin: 0 0 10px 0;
          font-weight: 700;
        }

        .register-header p {
          color: #999;
          margin: 0;
        }

        .register-form h2 {
          color: white;
          font-size: 24px;
          margin: 0 0 10px 0;
        }

        .register-subtitle {
          color: #999;
          margin: 0 0 30px 0;
          font-size: 14px;
        }

        .error-message {
          background: rgba(255, 59, 48, 0.1);
          border: 1px solid rgba(255, 59, 48, 0.3);
          color: #ff3b30;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          color: #C0E529;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
        }

        .form-group input {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(192, 229, 41, 0.2);
          border-radius: 8px;
          color: white;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: #C0E529;
          background: rgba(255, 255, 255, 0.08);
        }

        .form-group input::placeholder {
          color: #666;
        }

        .field-error {
          display: block;
          color: #ff3b30;
          font-size: 12px;
          margin-top: 6px;
        }

        .register-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #C0E529 0%, #9BBF1E 100%);
          color: #000;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 30px;
        }

        .register-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(192, 229, 41, 0.3);
        }

        .register-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(0, 0, 0, 0.3);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .login-link {
          text-align: center;
          margin-top: 20px;
          color: #999;
          font-size: 14px;
        }

        .login-link a {
          color: #C0E529;
          text-decoration: none;
          font-weight: 500;
        }

        .login-link a:hover {
          text-decoration: underline;
        }

        .register-footer {
          margin-top: 30px;
          text-align: center;
          color: #666;
          font-size: 12px;
        }

        @media (max-width: 768px) {
          .register-box {
            padding: 30px 20px;
          }

          .register-header h1 {
            font-size: 28px;
          }

          .register-form h2 {
            font-size: 20px;
          }
        }
      `}</style>
        </div>
    );
}

export default Register;

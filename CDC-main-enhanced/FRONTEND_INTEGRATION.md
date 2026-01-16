# CDC Investor Portal - Frontend Integration Guide

## 🔗 Connecting Frontend to Backend

This guide explains how to integrate the React frontend with the new backend API.

## 📦 Required Dependencies

Add these dependencies to `package.json`:

```json
"dependencies": {
  "axios": "^1.7.9",
  "react-router-dom": "^7.1.3",
  ...existing dependencies
}
```

Install:
```bash
npm install axios react-router-dom
```

## ⚙️ Environment Configuration

Create `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api
```

For production (Vercel):
```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

## 🔐 Authentication Integration

### 1. Update main.jsx

Wrap your app with AuthProvider and Router:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import App from './App.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
```

### 2. Update App.jsx

Add authentication routing:

```jsx
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import analyticsClient from './services/analyticsClient';

// Import pages
import Login from './pages/Login';
import Register from './pages/Register';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import Overview from './pages/Overview';
import Financials from './pages/Financials';
import Stores from './pages/Stores';
import Market from './pages/Market';
import Funding from './pages/Funding';
import Team from './pages/Team';
import Documents from './pages/Documents';
import Chatbot from './components/Chatbot';
import { DataProvider } from './context/DataContext';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Main Dashboard Component
function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Track page views
  useEffect(() => {
    analyticsClient.trackPageView(activeSection);
  }, [activeSection]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <Overview />;
      case 'financials': return <Financials />;
      case 'stores': return <Stores />;
      case 'market': return <Market />;
      case 'funding': return <Funding />;
      case 'team': return <Team />;
      case 'documents': return <Documents />;
      default: return <Overview />;
    }
  };

  return (
    <>
      <MobileHeader isMenuOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
      <div className={`sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu} />
      
      <svg className="swirl swirl-br" viewBox="0 0 200 200">
        <path d="M150 180 Q180 150 150 120 Q120 90 150 60 Q180 30 150 0" fill="none" stroke="#C0E529" strokeWidth="20" strokeLinecap="round"/>
      </svg>

      <div className="app">
        <Sidebar activeSection={activeSection} onNavClick={handleNavClick} isOpen={isMobileMenuOpen} />
        <main className="main">{renderSection()}</main>
      </div>

      <Chatbot isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
      <button className={`chat-fab ${isChatOpen ? 'hidden' : ''}`} onClick={() => setIsChatOpen(true)}>
        <i className="fas fa-comment-dots"></i>
      </button>
    </>
  );
}

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </DataProvider>
  );
}

export default App;
```

### 3. Update DataContext.jsx

Fetch data from backend API instead of static file:

```jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { dataAPI } from '../services/api';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await dataAPI.getAllData();
      setData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFromOCR = (ocrData) => {
    // Merge OCR data with existing data
    setData(prev => ({ ...prev, ...ocrData }));
  };

  return (
    <DataContext.Provider value={{ data, loading, updateFromOCR, refreshData: fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
```

## 🎯 Analytics Tracking

Analytics are automatically tracked when users:
- Login (location, device, time)
- Navigate between pages
- Spend time on pages
- Logout

No additional code needed - it's handled by `analyticsClient` service.

## 🚀 Deployment

### Frontend (Vercel)

1. Update `.env` with production backend URL
2. Deploy to Vercel as usual
3. Add environment variable in Vercel dashboard:
   - `VITE_API_URL=https://your-backend.railway.app/api`

### Backend

See `backend/README.md` for deployment instructions.

## 🔄 Data Flow

1. **Login**: User logs in → Backend creates session → Frontend stores JWT token
2. **Page View**: User navigates → Frontend sends pageview event → Backend tracks
3. **Data Fetch**: Frontend requests `/api/data/all` → Backend returns latest data
4. **OCR Update**: Admin uploads document → Backend processes → Data auto-updates

## 🧪 Testing Locally

1. Start backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Start frontend:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173
4. Register a new account
5. Login and explore

## 📝 Notes

- The UI/UX remains unchanged - only backend integration added
- All existing features (Google Sheets, OCR) still work
- New features: Authentication, Analytics, Automated OCR

## 🐛 Troubleshooting

### CORS Errors

Make sure backend `.env` has:
```env
CORS_ORIGIN=http://localhost:5173
```

### 401 Unauthorized

- Check if JWT token is in localStorage
- Try logging out and logging in again
- Check backend logs for token validation errors

### Data Not Loading

- Verify backend is running
- Check `VITE_API_URL` in frontend `.env`
- Open browser DevTools → Network tab to see API requests

---

**Ready to go! 🎉**

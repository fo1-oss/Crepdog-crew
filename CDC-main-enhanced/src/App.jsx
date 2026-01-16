import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import LoginEnhanced from './components/LoginEnhanced';
import Overview from './pages/Overview';
import Financials from './pages/Financials';
import Stores from './pages/Stores';
import Market from './pages/Market';
import Funding from './pages/Funding';
import Team from './pages/Team';
import Documents from './pages/Documents';
import Chatbot from './components/Chatbot';
import OCRAdmin from './components/OCRAdmin';
import DataSyncStatus from './components/DataSyncStatus';
import { EditProvider, EditModeToggle, EditableStyles } from './components/EditableField';
import { DataProvider, useData } from './context/DataContext';
import { AuthProvider, useAuth } from './hooks/useAuth';

function DataRoom() {
  const { isAuthenticated, loading, user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isOCROpen, setIsOCROpen] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const { updateFromOCR } = useData();

  // Track initial load separately
  useEffect(() => {
    if (!loading && initialLoad) {
      setInitialLoad(false);
    }
  }, [loading, initialLoad]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'financials':
        return <Financials />;
      case 'stores':
        return <Stores />;
      case 'market':
        return <Market />;
      case 'funding':
        return <Funding />;
      case 'team':
        return <Team />;
      case 'documents':
        return <Documents />;
      default:
        return <Overview />;
    }
  };

  // Show loading spinner only on initial load
  if (loading && initialLoad) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <LoginEnhanced />;
  }

  // Main data room
  return (
    <>
      <EditableStyles />
      <MobileHeader
        isMenuOpen={isMobileMenuOpen}
        toggleMenu={toggleMobileMenu}
      />

      <div
        className={`sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
      />

      {/* Decorative swirl */}
      <svg className="swirl swirl-br" viewBox="0 0 200 200">
        <path d="M150 180 Q180 150 150 120 Q120 90 150 60 Q180 30 150 0" fill="none" stroke="#C0E529" strokeWidth="20" strokeLinecap="round"/>
      </svg>

      <div className="app">
        <Sidebar
          activeSection={activeSection}
          onNavClick={handleNavClick}
          isOpen={isMobileMenuOpen}
          user={user}
          onLogout={logout}
        />

        <main className="main">
          {/* Edit Mode Toggle */}
          <div className="edit-mode-bar">
            <EditModeToggle />
          </div>
          {renderSection()}
        </main>
      </div>

      <Chatbot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

      <button
        className={`chat-fab ${isChatOpen ? 'hidden' : ''}`}
        onClick={() => setIsChatOpen(true)}
      >
        <i className="fas fa-comment-dots"></i>
      </button>

      {/* OCR Admin Button */}
      <button
        className="ocr-admin-btn"
        onClick={() => setIsOCROpen(true)}
        title="Update Data via OCR"
      >
        <i className="fas fa-file-image"></i>
      </button>

      {/* OCR Admin Modal */}
      {isOCROpen && (
        <OCRAdmin
          onDataExtracted={(data) => {
            updateFromOCR(data);
            setIsOCROpen(false);
          }}
          onClose={() => setIsOCROpen(false)}
        />
      )}

      {/* Google Sheets Sync Status */}
      <DataSyncStatus />
    </>
  );
}

function AppContent() {
  return (
    <EditProvider>
      <DataProvider>
        <DataRoom />
      </DataProvider>
    </EditProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

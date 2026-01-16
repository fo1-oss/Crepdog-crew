const navItems = [
  { id: 'overview', label: 'Overview', icon: 'fa-home' },
  { id: 'financials', label: 'Financials', icon: 'fa-chart-line' },
  { id: 'stores', label: 'Store Performance', icon: 'fa-store' },
  { id: 'market', label: 'Market & Competition', icon: 'fa-globe' },
  { id: 'funding', label: 'Funding & Expansion', icon: 'fa-rocket' },
  { id: 'team', label: 'Team', icon: 'fa-users' },
  { id: 'documents', label: 'Documents', icon: 'fa-folder-open' }
];

// Get initials from name or email
const getInitials = (user) => {
  if (user?.displayName) {
    const parts = user.displayName.split(' ');
    return parts.length > 1 
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : parts[0].substring(0, 2).toUpperCase();
  }
  if (user?.firstName && user?.lastName) {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  }
  if (user?.email) {
    return user.email.substring(0, 2).toUpperCase();
  }
  return 'U';
};

// Get display name
const getDisplayName = (user) => {
  if (user?.displayName) return user.displayName;
  if (user?.firstName && user?.lastName) return `${user.firstName} ${user.lastName}`;
  if (user?.firstName) return user.firstName;
  return 'User';
};

function Sidebar({ activeSection, onNavClick, isOpen, user, isAdmin, onLogout }) {
  return (
    <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
      <div className="logo-container">
        <div className="logo">
          <span className="logo-top">CREPDOG</span><br />
          <span className="logo-bottom">CREW</span>
        </div>
        <div className="logo-badge">INVESTOR DATA ROOM</div>
      </div>
      <nav className="nav">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onNavClick(item.id)}
          >
            <div className="icon">
              <i className={`fas ${item.icon}`}></i>
            </div>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      {/* User section at bottom of sidebar */}
      {user && (
        <div className="sidebar-user">
          <div className="user-info">
            <div className="user-avatar">
              {user.photoURL ? (
                <img src={user.photoURL} alt="" />
              ) : (
                getInitials(user)
              )}
            </div>
            <div className="user-details">
              <span className="user-name">
                {getDisplayName(user)}
                {isAdmin && <span className="admin-badge">Admin</span>}
              </span>
              <span className="user-company">{user.company || user.email}</span>
            </div>
          </div>
          <button className="sidebar-logout" onClick={onLogout} title="Sign Out">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;

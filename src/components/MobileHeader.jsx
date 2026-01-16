function MobileHeader({ isMenuOpen, toggleMenu }) {
  return (
    <div className="mobile-header">
      <div className="mobile-logo">CREPDOG CREW</div>
      <button className="mobile-menu-btn" onClick={toggleMenu}>
        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
    </div>
  );
}

export default MobileHeader;

function PageHeader({ title, highlight, subtitle }) {
  return (
    <div className="page-header">
      <div>
        <h1 className="page-title">
          {title} <span className="title-highlight">{highlight}</span>
        </h1>
        <div className="title-underline"></div>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      <div className="header-logo">
        <span>CREPDOG</span>
        <span style={{ fontWeight: 900 }}>CREW</span>
      </div>
    </div>
  );
}

export default PageHeader;

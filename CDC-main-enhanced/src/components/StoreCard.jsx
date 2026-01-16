function StoreCard({ name, meta, revenue, barWidth, apparelPct, shoesPct, variant = 'default' }) {
  const cardClass = `store-card ${variant === 'dark' ? 'dark' : variant === 'darker' ? 'darker' : ''}`;

  return (
    <div className={cardClass}>
      <div className="store-header">
        <div className="store-icon">
          <i className="fas fa-map-marker-alt"></i>
        </div>
        <div>
          <div className="store-name">{name}</div>
          <div className="store-meta">{meta}</div>
        </div>
      </div>
      <div className="store-revenue">{revenue}</div>
      <div className="store-label">Q3 FY'26 Revenue</div>
      <div className="store-bar">
        <div className="store-bar-fill" style={{ width: barWidth }}></div>
      </div>
      <div className="store-mix">
        <div className="store-mix-item">
          <div className="store-mix-value">{apparelPct}</div>
          <div className="store-mix-label">Apparel</div>
        </div>
        <div className="store-mix-item">
          <div className="store-mix-value">{shoesPct}</div>
          <div className="store-mix-label">Shoes</div>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;

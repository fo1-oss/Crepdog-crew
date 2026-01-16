function MetricRow({ icon, label, value }) {
  return (
    <div className="metric-row">
      <div className="metric-row-icon">
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="metric-row-label">{label}</div>
      <div className="metric-row-value">{value}</div>
    </div>
  );
}

export default MetricRow;

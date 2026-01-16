function StatPill({ label, value }) {
  return (
    <div className="stat-pill">
      <div className="stat-pill-label">{label}</div>
      <div className="stat-pill-value">{value}</div>
    </div>
  );
}

export default StatPill;
